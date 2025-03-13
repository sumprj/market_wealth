import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, ValidationError } from 'class-validator';

@ValidatorConstraint({ name: 'IsUsernameOrEmail', async: false })
export class IsUsernameOrEmailConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    return object.username || object.email;  // Ensures at least one is provided
  }

  defaultMessage(args: ValidationArguments) {
    return 'Either username or email must be provided for login';
  }
}
