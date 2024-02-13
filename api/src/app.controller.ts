import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  visited() {
    return 'Visited';
  }

  @Get('mods')
  getMods(@Res() res: Response) {
    console.log('VISITED');
    res.sendFile('/minecraft/mods.zip');
  }
}
