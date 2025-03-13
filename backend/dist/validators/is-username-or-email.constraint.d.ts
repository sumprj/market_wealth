import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsUsernameOrEmailConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): any;
    defaultMessage(args: ValidationArguments): string;
}
