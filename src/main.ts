import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setting up swagger
  const options = new DocumentBuilder().setTitle('Movies API').build();
  const documentation = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, documentation);

  await app.listen(3000);
}
bootstrap();
