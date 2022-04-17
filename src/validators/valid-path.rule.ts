import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityNotFoundError, getConnection } from 'typeorm';

export function IsValidPath(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidPath',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidPathRule,
    });
  };
}

@ValidatorConstraint({ name: 'IsValidPath', async: true })
export class IsValidPathRule implements ValidatorConstraintInterface {
  async validate(value: string) {
    if (!value) {
      return false;
    }

    if (!value.startsWith('/')) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} not found`;
  }
}
