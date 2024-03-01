import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as cookieParser from 'cookie-parser';
import { NextFunction, Request } from 'express';
import { Model } from 'mongoose';
import { Session } from 'src/schemas/Session.schema';
import { UserSession } from 'src/user/types/user';
import { decryptTokens } from '../utils/helpers';

@Injectable()
export class SessionService implements NestMiddleware {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}

  async serialize(request: Request, userSession: UserSession) {
    request.session.user = { discordId: userSession.discordId };
    request.user = userSession;
    console.log(request.session.user);
    try {
      return await this.sessionModel.findOneAndUpdate(
        { sessionId: request.sessionID },
        {
          expiresAt: request.session.cookie.expires,
          data: JSON.stringify(userSession),
        },
        { upsert: true, new: true },
      );
    } catch (error) {
      throw new Error('Could not create session!');
    }
  }

  async deleteSession(sessionId: string) {
    const response = await this.sessionModel.deleteOne({ sessionId });
    return response.acknowledged;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const { DISCORD_SESSION } = req.cookies;
    if (!DISCORD_SESSION) return next();
    const sessionId = cookieParser.signedCookie(
      DISCORD_SESSION,
      process.env.COOKIE_SECRET,
    );
    if (!sessionId) return next();
    const sessionData = await this.sessionModel.findOne({ sessionId });
    if (sessionData) {
      const currentDate = new Date();
      if (sessionData.expiresAt < currentDate) {
        await this.sessionModel.deleteOne({ sessionId });
      } else {
        const data = JSON.parse(sessionData.data);
        data.tokens = decryptTokens(data.tokens);
        req.user = data;
        req.sessionID = sessionId;
      }
    }
    next();
  }
}
