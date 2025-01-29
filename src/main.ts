// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter'; // Import the filter
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt -auth-guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global validation pipe to validate DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Apply global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // If you're using cookies
  });

  const jwtService = app.get(JwtService);
  app.useGlobalGuards(new JwtAuthGuard(jwtService));

  await app.listen(5000);
}

bootstrap();
