import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('NestJS Study API Docs')
    .setDescription('NestJS Study API description')
    .setVersion('1.0.0')
    .addTag('swagger')
    .build();

  // config를 바탕으로 swagger document 생성
  const document = SwaggerModule.createDocument(app, options);
  // Swagger UI에 대한 path를 연결함
  // .setup('swagger ui endpoint', app, swagger_document)
  SwaggerModule.setup('api', app, document);
  console.log(`Swagger UI is available at /api/docs`);
  await app.listen(3000);
}

bootstrap();
