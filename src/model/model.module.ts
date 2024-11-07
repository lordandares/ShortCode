import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkService } from './services/link/link.sercice';
import { LinkResolver } from './resolver/link/link.resolver';
import { Link } from './entities/link/link';
import { ShortLinkService } from './services/link/helpers/shortLinkService';
import { UrlCrawlerService } from './services/link/helpers/urlCrawler';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinkService, LinkResolver, ShortLinkService, UrlCrawlerService],
  exports: [LinkService],
})
export class ModelModule {}
