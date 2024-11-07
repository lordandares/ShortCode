import { UrlCrawlerService } from './urlCrawler';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UrlCrawlerService', () => {
  let service: UrlCrawlerService;

  beforeEach(() => {
    service = new UrlCrawlerService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the title of the webpage', async () => {
    const htmlContent =
      '<html><head><title>Test Page Title</title></head><body></body></html>';
    mockedAxios.get.mockResolvedValueOnce({ data: htmlContent });

    const title = await service.getTitle('http://example.com');

    expect(title).toBe('Test Page Title');
  });

  it('should return "No title available" if the title tag is empty', async () => {
    const htmlContent =
      '<html><head><title></title></head><body></body></html>';
    mockedAxios.get.mockResolvedValueOnce({ data: htmlContent });

    const title = await service.getTitle('http://example.com');

    expect(title).toBe('No title available');
  });

  it('should return "No title available" if an error occurs during fetching', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    const title = await service.getTitle('http://example.com');

    expect(title).toBe('No title available');
  });
});
