import { Controller, Inject } from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants';

@Controller(ROUTES.USER)
export class UserController {
  constructor(@Inject(SERVICES.USER) private usersService) {}
}
