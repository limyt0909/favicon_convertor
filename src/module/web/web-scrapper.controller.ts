import { Controller, Get, Query } from '@nestjs/common';

import { WebScrapperService } from './web-scrapper.service';
import { ApiTags } from '@nestjs/swagger';
import { QueryWebScrapperDto } from './dto/query-web-scrapper.dto';

@Controller('web-favicon')
@ApiTags('web-favicon')
export class WebScrapperContoller {
  constructor(private readonly webScrapperService: WebScrapperService) {}

  @Get("")
  async get(@Query()query:QueryWebScrapperDto) {
    return this.webScrapperService.getFaviconCheerio(query.url);
  }
}
