import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(['', ':username'])
  async getUser(@Param('username') username?: string) {
    const targetUsername = username || 'Alvinferdeveloper';
    return this.userService.getUserProfile(targetUsername);
  }
}
