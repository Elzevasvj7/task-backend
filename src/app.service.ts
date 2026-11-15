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
    message: 'Esto es green X2 desplegado con éxito en el puerto 3000',
  };
  } 
}
