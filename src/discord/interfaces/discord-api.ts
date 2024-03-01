export interface IDiscordApiService {
  fetchUserGuilds(accessToken: string): Promise<UserGuildResponse[]>;
  fetchBotGuilds(): Promise<UserGuildResponse[]>;
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

export interface UserGuildResponse {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
}
