import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const corsOptions = {
    origin: ['http://localhost:5180', 'http://10.0.0.171:5180'],
  };
  const config = new DocumentBuilder()
    .setTitle('Rawg Apis')
    .setDescription('Document for Rawg Api')
    .setVersion('1.0')
    .addTag('Rawg')
    .build();

  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
