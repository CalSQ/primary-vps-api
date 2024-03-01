import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from 'src/user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { SERVICES } from 'src/utils/constants';
import { AuthGuard } from './utils/guards';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from 'src/schemas/Session.schema';
import { SessionService } from './services/session.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Session.name,
        schema: SessionSchema,
      },
    ]),
    UsersModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: SERVICES.SESSION,
      useClass: SessionService,
    },
    {
      provide: SERVICES.AUTH,
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionService).forRoutes('/');
  }
}
