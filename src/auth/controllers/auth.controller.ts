import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserSession } from 'src/user/types/user';
import { FRONTEND_ROUTES, ROUTES, SERVICES } from 'src/utils/constants';
import { IAuthService } from '../interfaces/auth';
import { AuthUser, SessionID } from '../utils/decorators';
import { AuthGuard } from '../utils/guards';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    @Inject(SERVICES.AUTH) private readonly authService: IAuthService,
  ) {}

  @Get('login')
  login(@AuthUser() user: UserSession, @Res() response: Response) {
    response.redirect(
      user
        ? process.env.FRONTEND_HOST + FRONTEND_ROUTES.MENU
        : process.env.DISCORD_OAUTH_REDIRECT,
    );
  }

  @Get('redirect')
  async redirect(@Req() request: Request, @Res() response: Response) {
    const { code } = request.query;
    if (!code)
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
    response.redirect(process.env.FRONTEND_HOST + FRONTEND_ROUTES.MENU);
  }

  @Get('status')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  status(@AuthUser() user: UserSession) {
    const { tokens, ...partialUser } = user;
    return partialUser;
  }

  @Post('revoke')
  @UseGuards(AuthGuard)
  async revoke(@AuthUser() user: UserSession, @SessionID() sessionId: string) {
    try {
      await this.authService.revokeUser(sessionId, user);
      return { revoked: true };
    } catch (error: unknown) {
      if (error instanceof Error && error.cause === 'Application') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'There was a problem.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
