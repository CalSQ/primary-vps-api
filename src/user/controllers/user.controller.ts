import { Controller, Inject } from '@nestjs/common';
import { SERVICES } from 'src/utils/constants';

@Controller('users')
export class UserController {
  constructor(@Inject(SERVICES.USER) private userService) {}
}
