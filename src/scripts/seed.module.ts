import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from '../model/entities/link/link';
import { LinkService } from '../model/services/link/link.sercice';
import { UrlCrawlerService } from '../model/services/link/helpers/urlCrawler'; // or wherever this service is located
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShortLinkService } from '../model/services/link/helpers/shortLinkService';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Loads .env file globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Link],
        synchronize: true, // Only for development
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Link]),
  ],
  providers: [LinkService, UrlCrawlerService, ShortLinkService],
})
export class SeedModule {}
