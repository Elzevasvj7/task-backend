import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/health')
  health(): {
    status: boolean;
    uptime: number;
    timestamp: string;
    message: string;
  } {
    return this.appService.health();
  }
}
