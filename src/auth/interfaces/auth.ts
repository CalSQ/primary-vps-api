import { Request } from 'express';
import { UserDoc } from 'src/schemas/User.schema';
import { UserDetails, UserSession } from 'src/user/types/user';

export interface IAuthService {
  validateUser(userDetails: UserDetails): Promise<UserDoc>;
  authenticateUser(request: Request, accessCode: string);
  revokeUser(sessionId: string, user: UserSession);
}

export interface OAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface OAuthCredentialsResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}
