import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Users CRUD (e2e)', () => {
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

  it('should create, list, get, update and delete a user', async () => {
    // create
    const createRes = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'alice', password: 'secret' })
      .expect(201);
    expect(createRes.body).toEqual(expect.objectContaining({ id: expect.any(Number), name: 'alice' }));
    const id = createRes.body.id;

    // list
    const listRes = await request(app.getHttpServer()).get('/users').expect(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.find((u: any) => u.id === id)).toBeTruthy();

    // get
    const getRes = await request(app.getHttpServer()).get(`/users/${id}`).expect(200);
    expect(getRes.body).toEqual(expect.objectContaining({ id, name: 'alice' }));

    // update
    const patchRes = await request(app.getHttpServer())
      .patch(`/users/${id}`)
      .send({ name: 'alice2' })
      .expect(200);
    expect(patchRes.body).toEqual(expect.objectContaining({ id, name: 'alice2' }));

    // delete
    await request(app.getHttpServer()).delete(`/users/${id}`).expect(204);

    // get 404 after delete
    await request(app.getHttpServer()).get(`/users/${id}`).expect(404);
  });
});
