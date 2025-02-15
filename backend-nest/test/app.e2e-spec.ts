import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from '../src/clients/entities/client.entity';

describe('ClientsController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Client>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repository = moduleFixture.get<Repository<Client>>(getRepositoryToken(Client));
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /clients', () => {
    it('should create a new client', async () => {
      const response = await request(app.getHttpServer())
        .post('/clients')
        .send({ name: 'John Doe', document: '123456789' })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('John Doe');
    });
  });

  describe('GET /clients', () => {
    it('should list clients', async () => {
      await request(app.getHttpServer())
        .post('/clients')
        .send({ name: 'Jane Doe', document: '987654321' });

      const response = await request(app.getHttpServer())
        .get('/clients?page=1&size=10')
        .expect(200);

      expect(response.body).toHaveProperty('content');
      expect(response.body.content.length).toBeGreaterThan(0);
    });
  });

  describe('GET /clients/:id', () => {
    it('should get a client by ID', async () => {
      const createdClient = await request(app.getHttpServer())
        .post('/clients')
        .send({ name: 'Client Test', document: '555666777' })
        .expect(201);

      const response = await request(app.getHttpServer())
        .get(`/clients/${createdClient.body.id}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Client Test');
    });
  });

  describe('PATCH /clients/:id', () => {
    it('should update a client', async () => {
      const createdClient = await request(app.getHttpServer())
        .post('/clients')
        .send({ name: 'Client Before Update', document: '999888777' })
        .expect(201);

      const response = await request(app.getHttpServer())
        .patch(`/clients/${createdClient.body.id}`)
        .send({ name: 'Client Updated' })
        .expect(200);

      expect(response.body.name).toBe('Client Updated');
    });
  });

  describe('DELETE /clients/:id', () => {
    it('should delete a client', async () => {
      const createdClient = await request(app.getHttpServer())
        .post('/clients')
        .send({ name: 'Client to Delete', document: '111222333' })
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/clients/${createdClient.body.id}`)
        .expect(200);

      const response = await request(app.getHttpServer())
        .get(`/clients/${createdClient.body.id}`)
        .expect(404);
    });
  });
});
