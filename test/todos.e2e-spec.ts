import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

function basicAuth(name: string, password: string) {
  const b64 = Buffer.from(`${name}:${password}`).toString('base64');
  return `Basic ${b64}`;
}

describe('Todos CRUD (e2e)', () => {
  let app: INestApplication;
  let authHeader: string;
  let userId: number;

  beforeAll(async () => {
    process.env.DATABASE_FILE = ':memory:';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    const userRes = await request(app.getHttpServer()).post('/users').send({ name: 'bob', password: 'pw' });
    userId = userRes.body.id;
    authHeader = basicAuth('bob', 'pw');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create/list/get/update/delete a todo and manage participants', async () => {
    // create
    const createRes = await request(app.getHttpServer())
      .post('/todos')
      .set('Authorization', authHeader)
      .send({ title: 'Test Todo', description: 'desc' })
      .expect(201);
    const todo = createRes.body;
    expect(todo).toEqual(expect.objectContaining({ id: expect.any(Number), title: 'Test Todo', creatorId: userId }));

    // list
    const listRes = await request(app.getHttpServer()).get('/todos').set('Authorization', authHeader).expect(200);
    expect(listRes.body).toEqual(expect.arrayContaining([expect.objectContaining({ id: todo.id })]));

    // get with relations
    const getRes = await request(app.getHttpServer()).get(`/todos/${todo.id}`).set('Authorization', authHeader).expect(200);
    expect(getRes.body).toEqual(expect.objectContaining({ id: todo.id }));

    // add participants (self and a new one)
    const user2 = await request(app.getHttpServer()).post('/users').send({ name: 'charlie', password: '123' });
    const addRes = await request(app.getHttpServer())
      .post(`/todos/${todo.id}/participants`)
      .set('Authorization', authHeader)
      .send({ userIds: [userId, user2.body.id] })
      .expect(200);
    expect(addRes.body).toEqual({ success: true });

    // update
    const patchRes = await request(app.getHttpServer())
      .patch(`/todos/${todo.id}`)
      .set('Authorization', authHeader)
      .send({ title: 'Updated' })
      .expect(200);
    expect(patchRes.body).toEqual(expect.objectContaining({ id: todo.id, title: 'Updated' }));

    // delete
    await request(app.getHttpServer()).delete(`/todos/${todo.id}`).set('Authorization', authHeader).expect(204);

    // 404 after delete
    await request(app.getHttpServer()).get(`/todos/${todo.id}`).set('Authorization', authHeader).expect(404);
  });
});
