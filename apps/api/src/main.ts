import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import type { Env } from './config/env.validation';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<Env, true>);

  const port = config.get('API_PORT', { infer: true });
  const corsOrigin = config.get('API_CORS_ORIGIN', { infer: true });

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({ origin: corsOrigin, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // OpenAPI é a fonte de verdade do contrato (ver docs/DECISIONS.md, ADR-0005).
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Projeto X API')
    .setDescription('API da plataforma de educação acessível (Libras como língua de 1ª classe).')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  Logger.log(`API em http://localhost:${port}  (docs em /docs)`, 'Bootstrap');
}

void bootstrap();
