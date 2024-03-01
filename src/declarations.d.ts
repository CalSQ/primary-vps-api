import { UserIdentifier, UserSession } from './user/types/user';

declare module 'express-session' {
  interface SessionData {
    user?: UserIdentifier;
  }
}

declare module 'express' {
  interface Request {
    user?: UserSession;
    cookies?: Record<string, string>;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      FRONTEND_HOST: string;
      ENCRYPT_KEY: string;
      COOKIE_SECRET: string;
      MONGO_URI: string;
      DISCORD_APP_ID: string;
      DISCORD_APP_SECRET: string;
      DISCORD_APP_REDIRECT: string;
      DISCORD_OAUTH_REDIRECT: string;
      DISCORD_BOT_TOKEN: string;
    }
  }
}
