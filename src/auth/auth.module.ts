import { Module } from '@nestjs/common';
import { UsersModule } from 'src/user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { SERVICES } from 'src/utils/constants';
import { DiscordStrategy } from './utils/strategies';
import { SessionSerializer } from './utils/serialize';

@Module({
  imports: [UsersModule],
  providers: [
    DiscordStrategy,
    SessionSerializer,
    {
      provide: SERVICES.AUTH,
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
