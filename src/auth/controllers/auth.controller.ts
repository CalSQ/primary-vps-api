import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants';
import { Request, Response } from 'express';
import { IAuthService } from '../interfaces/auth';
import { AuthGuard } from '../utils/guards';
import { AuthUser } from '../utils/decorators';
import { UserSession } from 'src/user/types/user';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    @Inject(SERVICES.AUTH) private readonly authService: IAuthService,
  ) {}

  @Get('login')
  login(@Res() response: Response) {
    // Check login state, if authorised redirect to dashboard otherwise OAuth URL
    response.redirect(
      'https://discord.com/api/oauth2/authorize?client_id=1149189404770979840&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A6001%2Fapi%2Fauth%2Fredirect%2F&scope=identify',
    );
  }

  @Get('redirect')
  async redirect(@Req() request: Request, @Res() response: Response) {
    const { code } = request.query;
    if (!code)
      // Change to /login front end route
      throw new HttpException('No code provided', HttpStatus.BAD_REQUEST);

    try {
      await this.authService.authenticateUser(request, code.toString());
    } catch (error: unknown) {
      if (error instanceof Error && error.cause === 'Application') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'There was a problem.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return response.send({ msg: 'Worked' });
  }

  @Get('status')
  @UseGuards(AuthGuard)
  status(@AuthUser() user: UserSession) {
    const { tokens, ...partialUser } = user;
    return partialUser;
  }

  @Post('logout')
  logout() {}
}
