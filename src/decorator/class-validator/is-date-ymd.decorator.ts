import { applyDecorators } from '@nestjs/common';
import { isISO8601, IsISO8601 } from 'class-validator';

export function isDateYMD(value: string) {
  return isISO8601(value, { strict: true, strictSeparator: false });
}

export function IsDateYMD() {
  return applyDecorators(IsISO8601({ strict: true, strictSeparator: false }));
}
