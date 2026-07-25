import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(['user', 'user/:username'])
  async getUser(@Param('username') username?: string) {
    const targetUsername = username || 'Alvinferdeveloper';
    return this.appService.getUserProfile(targetUsername);
  }
}
