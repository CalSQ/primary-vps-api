import { API_ROUTES, GRANT_TYPE } from 'src/utils/constants';
import { HttpStatus } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import {
  OAuthCredentialsResponse,
  OAuthTokens,
  UserProfileResponse,
} from '../interfaces/auth';

export function buildOAuthPayload(accessCode: string) {
  return new URLSearchParams({
    client_id: process.env.DISCORD_APP_ID,
    client_secret: process.env.DISCORD_APP_SECRET,
    grant_type: GRANT_TYPE.AUTHORIZATION,
    code: accessCode,
    redirect_uri: process.env.DISCORD_APP_REDIRECT,
  }).toString();
}

export function buildOAuthHeaders(
  accessToken: string,
  tokenType: string = 'Bearer',
) {
  return {
    Authorization: `${tokenType} ${accessToken}`,
  };
}

export async function exchangeCodeForAccessToken(
  accessCode: string,
): Promise<OAuthCredentialsResponse> {
  if (!accessCode)
    throw new Error('Access code was not found.', { cause: 'Application' });
  const response = await fetch(API_ROUTES.TOKEN_EXCHANGE, {
    method: 'POST',
    body: buildOAuthPayload(accessCode),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  if (response.status !== HttpStatus.OK)
    throw new Error('Problem exchanging code', { cause: 'Application' });
  return await response.json();
}

export async function fetchUserProfile(
  accessToken: string,
  tokenType: string,
): Promise<UserProfileResponse> {
  const response = await fetch(API_ROUTES.USER_PROFILE, {
    headers: buildOAuthHeaders(accessToken, tokenType),
  });
  if (response.status !== HttpStatus.OK)
    throw new Error('Problem fetching user profile', { cause: 'Application' });
  return await response.json();
}

export function encryptToken(token: string) {
  return CryptoJS.AES.encrypt(token, process.env.ENCRYPT_KEY).toString();
}

export function encryptTokens(
  accessToken: string,
  refreshToken: string,
): OAuthTokens {
  return {
    accessToken: encryptToken(accessToken),
    refreshToken: encryptToken(refreshToken),
  };
}

export function decryptToken(cipher: string) {
  const token = CryptoJS.AES.decrypt(cipher, process.env.ENCRYPT_KEY);
  return token.toString(CryptoJS.enc.Utf8);
}
