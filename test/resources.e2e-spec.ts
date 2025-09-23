import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

function basic(username: string, password: string) {
  const token = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${token}`;
}

describe('Resources (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.DATABASE_FILE = ':memory:';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create users', async () => {
    const res1 = await request(app.getHttpServer()).post('/users').send({ name: 'alice', password: 'pw1' }).expect(201);
    expect(res1.body).toHaveProperty('id');
    expect(res1.body).toMatchObject({ name: 'alice' });

    const res2 = await request(app.getHttpServer()).post('/users').send({ name: 'bob', password: 'pw2' }).expect(201);
    expect(res2.body).toHaveProperty('id');
  });

  it('should fail to create todo without auth', async () => {
    await request(app.getHttpServer()).post('/todos').send({ title: 'Test', description: 'D' }).expect(401);
  });

  let todoId: number;
  it('should create todo with auth', async () => {
    const res = await request(app.getHttpServer())
      .post('/todos')
      .set('Authorization', basic('alice', 'pw1'))
      .send({ title: 'Einkauf', description: 'Liste' })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    todoId = res.body.id;
  });

  it('should add participant to todo', async () => {
    await request(app.getHttpServer())
      .post(`/todos/${todoId}/participants`)
      .set('Authorization', basic('alice', 'pw1'))
      .send({ userIds: [2] })
      .expect(200);
  });

  it('should create task for todo', async () => {
    const res = await request(app.getHttpServer())
      .post(`/todos/${todoId}/tasks`)
      .set('Authorization', basic('alice', 'pw1'))
      .send({ title: 'Milch kaufen', description: '3,5%' })
      .expect(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should fetch todo with participants and tasks', async () => {
    const res = await request(app.getHttpServer())
      .get(`/todos/${todoId}`)
      .set('Authorization', basic('alice', 'pw1'))
      .expect(200);
    expect(res.body).toHaveProperty('participants');
    expect(res.body).toHaveProperty('tasks');
  });
});
