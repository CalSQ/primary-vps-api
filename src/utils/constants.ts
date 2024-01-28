export enum ROUTES {
  AUTH = 'auth',
  USER = 'user',
}

export enum SERVICES {
  USER = 'USER_SERIVCE',
  AUTH = 'AUTH_SERVICE',
  SERIALIZER = 'SERIALIZER_SERVICE',
}

export enum API_ROUTES {
  TOKEN_EXCHANGE = 'https://discord.com/api/v10/oauth2/token',
  USER_PROFILE = 'https://discord.com/api/v10/users/@me',
}

export enum GRANT_TYPE {
  AUTHORIZATION = 'authorization_code',
  REFRESH = 'refresh_token',
}
