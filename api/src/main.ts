import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Middlewares
  app.enableCors({
    origin: ['*'],
    credentials: true,
  });

  try {
    await app.listen(PORT);
    console.log(`Running on port ${PORT}`);
  } catch (err) {
    throw new Error(`Could not listen for port: ${PORT}`);
  }
}

bootstrap();
