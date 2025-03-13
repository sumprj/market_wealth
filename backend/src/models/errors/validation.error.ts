// src/errors/validation.error.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationError extends HttpException {
  constructor(message: string) {
    // You can customize the HTTP status code if needed. 
    // For example, use HttpStatus.BAD_REQUEST for validation errors.
    super({ message, error: 'Validation Error' }, HttpStatus.BAD_REQUEST);
  }
}
