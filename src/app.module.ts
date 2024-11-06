import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModelModule } from './model/model.module';
import { User } from './model/entities/user/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Loads .env variables globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User], // Add your entities here
        synchronize: true, // Disable in production
      }),
    }),
    ModelModule,
  ],
})
export class AppModule {}
