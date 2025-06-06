/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: {
  hot?: {
    accept: () => void;
    dispose: (callback: () => void) => void;
  };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      app.close().catch((err) => {
        console.error('HMR dispose 중 app.close() 오류:', err);
      });
    });
  }
}
bootstrap();
