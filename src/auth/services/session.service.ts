import { NextFunction, Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from 'src/schemas/Session.schema';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserSession } from 'src/user/types/user';

@Injectable()
export class SessionSerializer implements NestMiddleware {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}

  async serialize(request: Request, userSession: UserSession) {
    request.session.user = { discordId: userSession.discordId };
    request.user = userSession;
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

  async use(req: Request, res: Response, next: NextFunction) {
    const sessionData = await this.sessionModel.findOne({
      sessionId: req.sessionID,
    });
    if (sessionData) {
      const currentDate = new Date();
      if (sessionData.expiresAt < currentDate) {
        await this.sessionModel.deleteOne({
          sessionId: req.sessionID,
        });
      } else {
        const data = JSON.parse(sessionData.data);
        req.user = data;
      }
    }
    next();
  }
}
