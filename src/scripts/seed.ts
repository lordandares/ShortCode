// src/scripts/seed.ts
import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { Link } from '../model/entities/link/link';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';

async function generateRandomShortCode(): Promise<string> {
  return randomBytes(4).toString('hex'); // Generates a random 8-character hex string
}

async function seed() {
  // Create a NestJS application context
  const app = await NestFactory.createApplicationContext(SeedModule);

  // Get the repository through NestJS's dependency injection system
  const linkRepository = app.get<Repository<Link>>('LinkRepository');

  const links = [
    {
      originalUrl: 'https://example.com',
      reducedUrl: 'http://short.ly/example1',
      title: 'Example Website 1',
      frequency: Math.floor(Math.random() * 100),
      shortCode: await generateRandomShortCode(),
    },
    {
      originalUrl: 'https://example2.com',
      reducedUrl: 'http://short.ly/example2',
      title: 'Example Website 2',
      frequency: Math.floor(Math.random() * 100),
      shortCode: await generateRandomShortCode(),
    },
    {
      originalUrl: 'https://example3.com',
      reducedUrl: 'http://short.ly/example1',
      title: 'Example Website 3',
      frequency: Math.floor(Math.random() * 100),
      shortCode: await generateRandomShortCode(),
    },
    {
      originalUrl: 'https://example4.com',
      reducedUrl: 'http://short.ly/example2',
      title: 'Example Website 4',
      frequency: Math.floor(Math.random() * 100),
      shortCode: await generateRandomShortCode(),
    },
    {
      originalUrl: 'https://example3.com',
      reducedUrl: 'http://short.ly/example1',
      title: 'Example Website 5',
      frequency: Math.floor(Math.random() * 100),
      shortCode: await generateRandomShortCode(),
    },
    {
      originalUrl: 'https://example4.com',
      reducedUrl: 'http://short.ly/example2',
      title: 'Example Website 6',
      frequency: Math.floor(Math.random() * 100),
      shortCode: await generateRandomShortCode(),
    },
  ];

  for (const linkData of links) {
    const link = linkRepository.create(linkData);
    await linkRepository.save(link);
  }

  console.log('Seed data inserted successfully');
  await app.close();
}

seed().catch((error) => {
  console.error('Error seeding data:', error);
});
