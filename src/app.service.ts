import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  health(): {
    status: boolean;
    uptime: number;
    timestamp: string;
    message: string;
  } {
    return {
    status: true,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    message: "CI/CD Proyect working with Blue/Green deplopyment strategy",
  };
  } 
}
