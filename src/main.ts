import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not defined in the DTO
      forbidNonWhitelisted: false, // Throw an error if unknown properties are sent
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  await app.listen(3000);
}
bootstrap();
