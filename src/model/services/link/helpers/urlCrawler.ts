import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class UrlCrawlerService {
  async getTitle(url: string): Promise<string> {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const title = $('title').text();
      return title || 'No title available';
    } catch (error) {
      console.error(`Failed to fetch title for URL ${url}:`, error);
      return 'No title available';
    }
  }
}
