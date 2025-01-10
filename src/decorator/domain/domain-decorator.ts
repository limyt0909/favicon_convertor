import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsDomainWithWWW(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDomainWithWWW',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }
          // 정규식을 사용하여 도메인이 www로 시작하는지 검증
          return /^https?:\/\/www\./.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a URL starting with "www".`;
        },
      },
    });
  };
}
