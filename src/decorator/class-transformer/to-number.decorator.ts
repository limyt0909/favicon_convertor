import { Transform } from 'class-transformer';
import { ValidationOptions } from 'class-validator';

export function ToNumber(validationOptions?: ValidationOptions) {
  return Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value?.map((val) => (typeof val === 'string' ? +val : val));
    }
    if (typeof value === 'string') {
      return +value;
    }
    return value;
  });
}
