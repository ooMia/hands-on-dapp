import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AppController } from './app.controller';
import { HelloModule } from './contracts/hello/hello.module';

@Module({
  imports: [CommonModule, HelloModule],
  controllers: [AppController],
})
export class AppModule {}
