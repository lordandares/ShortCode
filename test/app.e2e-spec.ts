import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UrlCrawlerService } from './../src/model/services/link/helpers/urlCrawler';

describe('LinkResolver e2e', () => {
  let app: INestApplication;
  let urlCrawlerService: UrlCrawlerService;
  const originalUrl = `https://test.com/${Math.floor(Math.random() * 10000000) + 1}`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Get the actual UrlCrawlerService instance and mock `getTitle`
    urlCrawlerService = moduleFixture.get<UrlCrawlerService>(UrlCrawlerService);
    jest
      .spyOn(urlCrawlerService, 'getTitle')
      .mockResolvedValue('Mocked Page Title');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a shortened URL', async () => {
    const reducedUrlMutation = `
      mutation {
        reducedUrl(originalUrl: "${originalUrl}") {
          id
          originalUrl
          reducedUrl
          frequency
          title
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: reducedUrlMutation })
      .expect(200);

    const link = response.body.data.reducedUrl;
    expect(link).toHaveProperty('id');
    expect(link.originalUrl).toBe(originalUrl);
    expect(link).toHaveProperty('reducedUrl');
    expect(link.frequency).toBe(0);
  });

  it('should retrieve the original URL from a shortened URL', async () => {
    const reducedUrlMutation = `
      mutation {
        reducedUrl(originalUrl: "${originalUrl}") {
          reducedUrl
        }
      }
    `;

    // Create a shortened URL
    const createResponse = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: reducedUrlMutation })
      .expect(200);

    const reducedUrl = createResponse.body.data.reducedUrl.reducedUrl;

    const getOriginalUrlQuery = `
      query {
        getOriginalUrl(url: "${reducedUrl}") {
          id
          originalUrl
          reducedUrl
          frequency
          title
        }
      }
    `;

    // Retrieve the original URL
    const getResponse = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: getOriginalUrlQuery })
      .expect(200);

    const link = getResponse.body.data.getOriginalUrl;
    expect(link.originalUrl).toBe(originalUrl);
    expect(link.reducedUrl).toBe(reducedUrl);
  });

  it('should retrieve the top 100 most frequently accessed links', async () => {
    const topOneHundredQuery = `
      query {
        topOneHundred {
          id
          originalUrl
          reducedUrl
          frequency
          title
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: topOneHundredQuery })
      .expect(200);

    const links = response.body.data.topOneHundred;
    expect(links).toBeInstanceOf(Array);
    expect(links.length).toBeLessThanOrEqual(100);
    links.forEach((link) => {
      expect(link).toHaveProperty('id');
      expect(link).toHaveProperty('originalUrl');
      expect(link).toHaveProperty('reducedUrl');
      expect(link).toHaveProperty('frequency');
      expect(link).toHaveProperty('title');
    });
  });
});
