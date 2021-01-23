import Http from 'http';
import request from 'supertest';
import Knex from 'knex';
import { Model } from 'objection';

import app from '../app';
import knexConfig from '../../knexfile';

const knex = Knex(knexConfig.test);
Model.knex(knex);

let server: Http.Server;

const existedUser = {
  email: 'test@mail.com',
  password: 'test',
};

beforeAll(async (done) => {
  await knex.migrate.latest();
  await knex.seed.run();

  server = app.listen(8081, done);
});

afterAll(async (done) => {
  await knex.migrate.rollback();
  server?.close(done);
});

describe('auth routes', () => {
  describe('post /api/registration', () => {
    test('registration success flow', async (done) => {
      const fakeUser = {
        email: 'new_user@gmain.com',
        password: 'password',
        first_name: 'first_name',
        last_name: 'last_name',
      };
      const response = await request(server).post('/api/registration').send(fakeUser);

      expect(response.status).toEqual(201);
      expect(response.body.email).toEqual(fakeUser.email);
      expect(response.body.first_name).toEqual(fakeUser.first_name);
      expect(response.body.last_name).toEqual(fakeUser.last_name);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('updated_at');
      done();
    });

    test('registration failure flow', async () => {
      const response = await request(server).post('/api/registration').send(existedUser);

      expect(response.status).toEqual(409);
      expect(response.body.message).toEqual('Email already in use');
    });
  });

  describe('post /api/login', () => {
    test('login success flow', async (done) => {
      const response = await request(server)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send(existedUser);

      expect(response.status).toEqual(200);
      expect(Object.keys(response.body)).toEqual(expect.arrayContaining(['token']));
      done();
    });

    test('login failure flow', async () => {
      const unknownUser = {
        email: '1111@mail.com',
        password: '12234',
      };
      const response = await request(server).post('/api/login').send(unknownUser);

      expect(response.status).toEqual(401);
      expect(response.body.message).toEqual('User does not exist');
    });
  });
});
