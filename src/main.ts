import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const corsOptions = {
    origin: 'http://localhost:5180',
  }
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  await app.listen(3001);
}
bootstrap();
