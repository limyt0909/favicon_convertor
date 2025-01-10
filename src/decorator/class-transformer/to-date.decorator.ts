import { Transform } from 'class-transformer';
import { ValidationOptions } from 'class-validator';

export function ToDate(validationOptions?: ValidationOptions) {
  return Transform(({ value }) => {
    if (!value) return null;
    if (value instanceof Date) {
      return value;
    }

    return null;
  });
}
