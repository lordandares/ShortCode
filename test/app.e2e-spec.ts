import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UserResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a user', () => {
    const createUserMutation = `
      mutation {
        createUser(createUserInput: {
          firstName: "John",
          lastName: "Doe",
          age: 30,
          address: "123 Main St"
        }) {
          id
          firstName
          lastName
          age
          address
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createUserMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createUser).toEqual({
          id: expect.any(Number),
          firstName: 'John',
          lastName: 'Doe',
          age: 30,
          address: '123 Main St',
        });
      });
  });

  it('should fetch all users', () => {
    const findAllUsersQuery = `
      query {
        findAllUsers {
          id
          firstName
          lastName
          age
          address
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: findAllUsersQuery,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.findAllUsers).toBeInstanceOf(Array);
      });
  });

  it('should fetch a user by id', () => {
    const findUserByIdQuery = `
      query {
        findUserById(id: 2) {
          id
          firstName
          lastName
          age
          address
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: findUserByIdQuery,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.findUserById).toEqual({
          id: 2,
          firstName: expect.any(String),
          lastName: expect.any(String),
          age: expect.any(Number),
          address: expect.any(String),
        });
      });
  });

  it('should update a user', () => {
    const updateUserMutation = `
      mutation {
        updateUser(id: 3, updateUserInput: {
          firstName: "Jane"
        }) {
          id
          firstName
          lastName
          age
          address
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: updateUserMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.updateUser).toEqual({
          id: 3,
          firstName: 'Jane',
          lastName: expect.any(String),
          age: expect.any(Number),
          address: expect.any(String),
        });
      });
  });

  it.skip('should delete a user', () => {
    const deleteUserMutation = `
      mutation {
        deleteUser(id: 1)
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: deleteUserMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deleteUser).toBe(true);
      });
  });
});
