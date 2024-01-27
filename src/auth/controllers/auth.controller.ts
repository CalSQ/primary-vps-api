import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ROUTES } from 'src/utils/constants';
import { DiscordAuthGuard } from '../utils/guards';

@Controller(ROUTES.AUTH)
export class AuthController {
  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {}

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  async redirect() {
    // const { code } = request.query;
    // if (!code) return;
    // const formData = new URLSearchParams({
    //   client_id: process.env.DISCORD_APP_ID,
    //   client_secret: process.env.DISCORD_APP_SECRET,
    //   grant_type: 'authorization_code',
    //   code: code.toString(),
    //   redirect_uri: 'http://127.0.0.1:6001/auth/redirect/',
    // });
    // const oauthResponse = await fetch(
    //   'https://discord.com/api/v10/oauth2/token',
    //   {
    //     method: 'POST',
    //     body: formData.toString(),
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //   },
    // );
    // const oauthResponseData = await oauthResponse.json();
    // if (oauthResponse.status === HttpStatus.OK && oauthResponseData) {
    //   const { token_type, access_token, refresh_token } = oauthResponseData;
    //   const userResponse = await fetch(
    //     'https://discord.com/api/v10/users/@me',
    //     {
    //       headers: {
    //         Authorization: `${token_type} ${access_token}`,
    //       },
    //     },
    //   );
    //   const { id: discordId } = await userResponse.json();
    //   // session.user = {
    //   //   id: '',
    //   //   discordId,
    //   // };
    //   return response.send({ msg: 'Worked' });
    // }
    // throw new HttpException(
    //   oauthResponseData.message,
    //   HttpStatus.INTERNAL_SERVER_ERROR,
    // );
  }

  @Get('status')
  status() {}

  @Post('logout')
  logout() {}
}
