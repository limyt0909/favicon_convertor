import { IsString } from 'class-validator';
import { IsDomainWithWWW } from 'src/decorator/domain/domain-decorator';

export class QueryWebScrapperDto {
  @IsString()
  @IsDomainWithWWW({ message: 'WWW.도메인은 필수입니다.' })
  url: string;
}
