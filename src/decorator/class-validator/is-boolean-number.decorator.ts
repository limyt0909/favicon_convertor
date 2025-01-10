import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsBooleanNumber(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isBooleanNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value === 0 || value === 1;
        },
        defaultMessage(validationArguments?: ValidationArguments) {
          return `${validationArguments.property} must be either 0 or 1.`;
        },
      },
    });
  };
}
