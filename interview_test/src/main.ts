import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './Interceptor/logging.interceptor';
import { TransformInterceptor } from './Interceptor/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './Interceptor/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
   // Global Interceptor
   app.useGlobalInterceptors(new TransformInterceptor());
 //  app.useGlobalFilters(new HttpExceptionFilter());
   app.useGlobalPipes(
    new ValidationPipe({}),
  );
  const config = new DocumentBuilder()
    .setTitle('Course App')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

 

  await app.listen(3000);
}
bootstrap();
