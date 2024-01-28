import { OAuthTokens } from 'src/auth/interfaces/auth';

export type UserIdentifier = {
  discordId: string;
};

export type UserDetails = UserIdentifier;

export type PartialUserDetails = Omit<Partial<UserDetails>, 'discordId'>;

export type UserSession = {
  tokens: OAuthTokens;
} & UserIdentifier;
