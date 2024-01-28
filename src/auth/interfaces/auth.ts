import { Request } from 'express';
import { UserDoc } from 'src/schemas/User.schema';
import { UserDetails } from 'src/user/types/user';

export interface IAuthService {
  validateUser(userDetails: UserDetails): Promise<UserDoc>;
  authenticateUser(request: Request, accessCode: string);
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

export interface UserProfileResponse {
  id: string;
  username: string;
  discriminator: string;
  global_name?: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
  avatar_decoration?: string;
}
