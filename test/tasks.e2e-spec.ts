import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

function basicAuth(name: string, password: string) {
  const b64 = Buffer.from(`${name}:${password}`).toString('base64');
  return `Basic ${b64}`;
}

describe('Tasks CRUD (e2e)', () => {
  let app: INestApplication;
  let authHeader: string;
  let todoId: number;

  beforeAll(async () => {
    process.env.DATABASE_FILE = ':memory:';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    // create user and todo
    await request(app.getHttpServer()).post('/users').send({ name: 'dave', password: 'pw' });
    authHeader = basicAuth('dave', 'pw');
    const todoRes = await request(app.getHttpServer())
      .post('/todos')
      .set('Authorization', authHeader)
      .send({ title: 'With Tasks' });
    todoId = todoRes.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create/list/get/update/delete tasks under a todo', async () => {
    // create task
    const createRes = await request(app.getHttpServer())
      .post(`/todos/${todoId}/tasks`)
      .set('Authorization', authHeader)
      .send({ title: 'Task 1', description: 'desc' })
      .expect(201);
    const task = createRes.body;
    const taskId = task.id;

    // list tasks
    const listRes = await request(app.getHttpServer())
      .get(`/todos/${todoId}/tasks`)
      .set('Authorization', authHeader)
      .expect(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.find((t: any) => t.id === taskId)).toBeTruthy();

    // get one
    const getRes = await request(app.getHttpServer())
      .get(`/todos/${todoId}/tasks/${taskId}`)
      .set('Authorization', authHeader)
      .expect(200);
    expect(getRes.body).toEqual(expect.objectContaining({ id: taskId }));

    // update
    const patchRes = await request(app.getHttpServer())
      .patch(`/todos/${todoId}/tasks/${taskId}`)
      .set('Authorization', authHeader)
      .send({ title: 'Task 1 Updated' })
      .expect(200);
    expect(patchRes.body).toEqual(expect.objectContaining({ id: taskId, title: 'Task 1 Updated' }));

    // delete
    await request(app.getHttpServer())
      .delete(`/todos/${todoId}/tasks/${taskId}`)
      .set('Authorization', authHeader)
      .expect(204);

    // 404 after delete
    await request(app.getHttpServer())
      .get(`/todos/${todoId}/tasks/${taskId}`)
      .set('Authorization', authHeader)
      .expect(404);
  });
});
