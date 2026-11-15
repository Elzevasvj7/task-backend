import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT ?? 3000;
  app.enableShutdownHooks();
  await app.listen(port);
  logger.log('--------------------------------------------------');
  logger.log(`🚀 El servidor ha despegado con éxito en el puerto ${port}`);
  logger.log('🔥 ¡Todo listo para recibir peticiones!');
  logger.log('Desarrollado con ❤️ por Elzevasvj7');
  logger.log('--------------------------------------------------');
  setTimeout(() => {
    console.error('💥 Crash intencional: Probando Blue/Green Rollback');
    process.exit(1);
  }, 2000);
}
await bootstrap();
