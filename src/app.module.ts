import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebScrapperModule } from './module/web/web-scrapper.module';

@Module({
  imports: [WebScrapperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
