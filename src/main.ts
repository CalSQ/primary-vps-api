import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as MongoDBSession from 'connect-mongodb-session';
import * as passport from 'passport';
const MongoDBStore = MongoDBSession(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middlewares
  app.use(
    session({
      name: 'DISCORD_SESSION',
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 86_400_000,
      },
      store: new MongoDBStore({
        uri: 'mongodb://127.0.0.1/sessions',
        collection: 'dashboard',
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // app.enableCors({
  //   origin: 'http://localhost:6001',
  //   credentials: true,
  // });

  try {
    await app.listen(process.env.PORT);
    console.log(`Running on port ${process.env.PORT}`);
  } catch (err) {
    throw new Error(`Could not listen for port: ${process.env.PORT}`);
  }
}

bootstrap();
