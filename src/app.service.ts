import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  health(): {
    status: string;
    uptime: number;
    timestamp: string;
    message: string;
  } {
    return {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    message: 'Esto es green',
  };
  } 
}
