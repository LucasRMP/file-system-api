import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { FileTypes } from 'src/resources/files/entities/file.entity';
import { EntityNotFoundError, getConnection } from 'typeorm';

export function ExistsWithType(
  entityClass: any,
  field = 'id',
  type: FileTypes = FileTypes.FILE,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'ExistsWithType',
      constraints: [entityClass, field, type],
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ExistsWithTypeRule,
    });
  };
}

@ValidatorConstraint({ name: 'ExistsWithType', async: true })
export class ExistsWithTypeRule implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    if (!value) {
      return false;
    }
    try {
      const [entityClass, field, type] = args.constraints;
      const conn = getConnection('default');
      const repository = conn.getRepository(entityClass);

      const result = await repository.findOne({
        where: {
          [field]: value,
          type,
        },
      });
      if (!result) {
        throw new EntityNotFoundError(entityClass, value);
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} with type '${args.constraints[2]}' not found`;
  }
}
