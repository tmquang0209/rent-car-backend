import { Seeder } from '@common/database/seeds';
import { HttpExceptionFilter } from '@common/filters';
import { JwtGuard } from '@common/guards';
import { PermissionGuard } from '@common/guards/permission.guard';
import { TransformationInterceptor } from '@common/interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.SEEDING === 'true') {
    await new Seeder().run();
  }

  const reflector = app.get(Reflector);

  app.enableCors({
    exposedHeaders: ['Content-Disposition'],
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, stopAtFirstError: true }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalGuards(new JwtGuard(reflector));
  app.useGlobalGuards(new PermissionGuard(reflector));

  app.useGlobalInterceptors(new TransformationInterceptor(reflector));

  const swgBuilder = new DocumentBuilder()
    .setTitle('Server API docs')
    .addBearerAuth();

  const swaggerDocument = SwaggerModule.createDocument(app, swgBuilder.build());
  SwaggerModule.setup('api', app, swaggerDocument, {
    jsonDocumentUrl: 'api-json',
  });

  await app.listen(process.env.PORT ?? 3000, () => {
    Logger.log(`Server is running on port ${process.env.PORT ?? 3000}`);
  });
}

bootstrap();
