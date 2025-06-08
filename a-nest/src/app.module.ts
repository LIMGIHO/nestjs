import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/looger.middleware';
import { module } from './constant/module.option';

// const getEnv = () => {
//   return {
//     PORT: '5000',
//   };
// };

@Module(module)
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
