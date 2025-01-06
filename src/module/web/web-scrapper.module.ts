import { Module } from '@nestjs/common';
import { WebScrapperService } from './web-scrapper.service';
import { WebScrapperContoller } from './web-scrapper.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  controllers: [WebScrapperContoller],
  providers: [WebScrapperService],
  exports :[WebScrapperService]
})
export class WebScrapperModule {}
