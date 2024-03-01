export enum ROUTES {
  AUTH = 'auth',
  USER = 'user',
  GUILD = 'guild',
  DISCORD = 'discord',
}

export enum SERVICES {
  USER = 'USER_SERIVCE',
  AUTH = 'AUTH_SERVICE',
  GUILD = 'GUILD_SERVICE',
  SESSION = 'SESSION_SERVICE',
  DISCORD = 'DISCORD_SERVICE',
  DISCORD_API = 'DISCORD_API_SERVICE',
}

export enum API_ROUTES {
  TOKEN_EXCHANGE = 'https://discord.com/api/v10/oauth2/token',
  REVOKE_TOKEN = 'https://discord.com/api/v10/oauth2/token/revoke',
  USER_PROFILE = 'https://discord.com/api/v10/users/@me',
  USER_GUILDS = 'https://discord.com/api/v10/users/@me/guilds',
}

export enum PERMISSION_FLAGS {
  MANAGE_GUILD = 0x20,
  ADMIN = 0x8,
}

export enum GRANT_TYPE {
  AUTHORIZATION = 'authorization_code',
  REFRESH = 'refresh_token',
}

export enum FRONTEND_ROUTES {
  LOGIN = '/login',
  MENU = '/menu',
}
