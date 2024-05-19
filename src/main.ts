/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  const cors = {
    origin: ['http://localhost:3000'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'
  }
  

  app.enableCors(cors);
  //Swagger setup

  const options = new DocumentBuilder()
  .setTitle('Task Management API')
  .setDescription('API for managing tasks and users')
  .setVersion('1.0')
  .addTag('Users', 'Endpoints related to user management')
    .addTag('Tasks', 'Endpoints related to task management')
    .addTag('Authentication', 'Endpoints related to auth management')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
