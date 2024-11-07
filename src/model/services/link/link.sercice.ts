import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from '../../entities/link/link';
import { IResultshortLink, ShortLinkService } from './helpers/shortLinkService';
import { UrlCrawlerService } from './helpers/urlCrawler';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
    private shortLink: ShortLinkService,
    private urlCrawlerService: UrlCrawlerService,
  ) {}

  async reduceLink(originalUrl: string): Promise<Link> {
    const link = new Link();
    try {
      const existingLink: Link = await this.linkRepository.findOneBy({
        originalUrl,
      });

      if (existingLink) {
        return existingLink;
      }
      link.originalUrl = originalUrl;
      const [lastLink] = await this.linkRepository.find({
        order: {
          id: 'DESC',
        },
        take: 1,
      });
      const resultshortLink: IResultshortLink = this.shortLink.shortenUrl(
        !lastLink ? 0 : lastLink.id,
      );
      link.reducedUrl = resultshortLink.url;
      link.shortCode = resultshortLink.shortId;
      link.title = await this.urlCrawlerService.getTitle(originalUrl);
      const newLink = this.linkRepository.create(link);
      return this.linkRepository.save(newLink);
    } catch (error) {
      console.log(error);
      throw new Error('Unexpected Error');
    }
  }

  async findOne(url: string): Promise<Link> {
    const shortCode = this.shortLink.extractShortId(url);
    const linkFound = await this.linkRepository.findOneBy({
      shortCode: shortCode,
    });
    if (!linkFound) throw new Error('No Url Foud');

    linkFound.frequency += 1;
    await this.linkRepository.save(linkFound);

    return linkFound;
  }

  async topOneHundred(): Promise<Link[]> {
    return this.linkRepository.find({
      order: { frequency: 'DESC' }, // Order by frequency in descending order
      take: 100, // Limit to the first 100 records
    });
  }
}
