import { UserIdentifier, UserSession } from './user/types/user';

declare module 'express-session' {
  interface SessionData {
    user?: UserIdentifier;
  }
}

declare module 'express' {
  interface Request {
    user?: UserSession;
  }
}
