import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterception } from './app.logging.interception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterception)
  await app.listen(3000);
  console.log();
}
bootstrap();
