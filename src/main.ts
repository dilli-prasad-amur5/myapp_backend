 
if (!process.env.IS_TO_NODE){
  require('module-alias/register')  
  /* 
  The env var (IS_TO_NODE) signals  app whether it’s running in ts-node mode.
  tsconfig-paths/register helps with TS path aliases during development.
  module-alias/register is only used in production or when running compiled JS.
  The conditional check prevents both from being loaded at once (which could cause problems).
  */
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
