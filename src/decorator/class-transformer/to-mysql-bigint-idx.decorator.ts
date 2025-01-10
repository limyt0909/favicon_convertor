import { Transform } from 'class-transformer';
import { ValidationOptions } from 'class-validator';
import { ToNumber } from './to-number.decorator';

/**
 * MySql BigInt([]) 타입으로 변환
 *
 * @description 그냥 value로 내뱉어주면 완전히 검증하고, 적당히 넘어가려면 value.toString() 이나 +value 등으로 transform 해주면 됩니다.
 * 나중엔 그걸 그냥 옵셔널 하게 줄까?
 */
function _convert(value: any) {
  return value.toString();
}

export function ToMysqlBigIntIdx(validationOptions?: ValidationOptions) {
  return Transform(({ value }) => {
    if (!value) return value;
    if (validationOptions?.each && Array.isArray(value)) {
      return value.map((v) => _convert(v));
    }
    /** backward-compatible */
    if (Array.isArray(value)) {
      return value.map((v) => _convert(v));
    }
    return _convert(value);
  });
}
