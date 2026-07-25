import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/user (GET)', () => {
    let fetchSpy: jest.SpyInstance;

    beforeEach(() => {
      fetchSpy = jest.spyOn(global, 'fetch');
    });

    afterEach(() => {
      fetchSpy.mockRestore();
    });

    it('should return default profile if no username is provided', async () => {
      fetchSpy.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ login: 'Alvinferdeveloper', name: 'Alvin', bio: 'Developer' }),
      } as Response);

      const res = await request(app.getHttpServer())
        .get('/user')
        .expect(200);

      expect(res.body).toEqual({ login: 'Alvinferdeveloper', name: 'Alvin', bio: 'Developer' });
      expect(fetchSpy).toHaveBeenCalledWith('https://api.github.com/users/Alvinferdeveloper', expect.any(Object));
    });

    it('should return profile for the specified username', async () => {
      fetchSpy.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ login: 'github', name: 'GitHub', bio: 'Platform' }),
      } as Response);

      const res = await request(app.getHttpServer())
        .get('/user/github')
        .expect(200);

      expect(res.body).toEqual({ login: 'github', name: 'GitHub', bio: 'Platform' });
      expect(fetchSpy).toHaveBeenCalledWith('https://api.github.com/users/github', expect.any(Object));
    });

    it('should return 404 if user does not exist on GitHub', async () => {
      fetchSpy.mockResolvedValue({
        ok: false,
        status: 404,
        text: () => Promise.resolve('Not Found'),
      } as Response);

      await request(app.getHttpServer())
        .get('/user/nonexistent')
        .expect(404);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
