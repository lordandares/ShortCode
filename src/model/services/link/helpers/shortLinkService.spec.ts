import { ShortLinkService, IResultshortLink } from './shortLinkService';

describe('ShortLinkService', () => {
  let service: ShortLinkService;

  beforeEach(() => {
    service = new ShortLinkService();
  });

  describe('shortenUrl', () => {
    it('should return a valid shortened URL and shortId for a given ID', () => {
      const id = 12345;
      const result: IResultshortLink = service.shortenUrl(id);

      expect(result).toHaveProperty('url');
      expect(result).toHaveProperty('shortId');
      expect(result.url).toBe(`http://localhost:3000/${result.shortId}`);
      expect(result.shortId).toBe(service['encodeBase62'](id));
    });

    it('should return "0" as shortId when the id is 0', () => {
      const id = 0;
      const result: IResultshortLink = service.shortenUrl(id);

      expect(result.shortId).toBe('0');
      expect(result.url).toBe('http://localhost:3000/0');
    });
  });

  describe('extractShortId', () => {
    it('should extract the shortId from a valid URL', () => {
      const url = 'http://localhost:3000/abc123';
      const result = service.extractShortId(url);

      expect(result).toBe('abc123');
    });

    it('should return null if the URL does not contain a shortId', () => {
      const url = 'http://localhost:3000/';
      const result = service.extractShortId(url);

      expect(result).toBeNull();
    });

    it('should handle URLs with extra slashes and extract the shortId', () => {
      const url = 'http://localhost:3000/some/path/abc123/';
      const result = service.extractShortId(url);

      expect(result).toBe('abc123');
    });
  });
});
