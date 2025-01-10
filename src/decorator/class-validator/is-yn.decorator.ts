import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsYN(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isYN',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value === 'Y' || value === 'N';
        },
        defaultMessage(validationArguments?: ValidationArguments) {
          return `${validationArguments.property} must be either "Y" or "N".`;
        },
      },
    });
  };
}
