import { HttpException, Injectable } from '@nestjs/common';


import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import * as https from 'https'; // Correct import statement
import * as iconv from 'iconv-lite';

@Injectable()
export class WebScrapperService {
  constructor(private httpService: HttpService) {}

  async getFaviconCheerio(url: string) {
    if (!url) {
      throw new HttpException('URL을 입력해주세요.', 400);
    }
    if (!url.includes('https://')) {
      throw new HttpException('유효하지 않은 URL 형식입니다.', 400);
    }
    try {
      const options = {
        method: 'get',
        httpsAgent: new https.Agent({
          rejectUnauthorized: false, // 허가되지 않은 인증을 reject하지 않겠다!
        }),
        responseType: 'arraybuffer' as const, // Correct type assertion
      };
      const response = await this.httpService.get(url, options).toPromise();
      const contentType = response.headers['content-type'];
      const match = /charset=([^\s;]+)/i.exec(contentType);
      const detectedEncoding = match ? match[1] : 'utf-8'; // Default to utf-8 if not found
      // Determine encoding dynamically
      // const detectedEncoding = iconv.encodingExists('utf-8') ? 'utf-8' : 'iso-8859-1';
      const html = iconv.decode(response.data, detectedEncoding);
      const $ = cheerio.load(html);
      let favicon_url = '';
      const faviconLink = $('link[rel="shortcut icon"], link[rel="icon"]').attr(
        'href',
      );
      const titleHead = $('title').text();

      if (faviconLink) {
        if (faviconLink.startsWith('http') || faviconLink.startsWith('//')) {
          favicon_url = faviconLink;
        } else {
          // 상대 URL을 절대 URL로 변환
          const baseUrl = url; // 기본 URL 설정 필요
          favicon_url = new URL(faviconLink, baseUrl).href;
        }
      }

      // Get Head Title

      return { extract_bool: true, favicon_url, title: titleHead };
    } catch (error) {
      // 유효하지 않은 URL일 경우
      console.error(error);
      return { extract_bool: false, favicon_url: '', title: '' };
    }
  }
}
