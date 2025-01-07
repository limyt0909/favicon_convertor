import { IsString } from 'class-validator';

export class QueryWebScrapperDto {
  @IsString()
  url: string;
}
