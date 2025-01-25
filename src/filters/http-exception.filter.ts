// src/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';

import * as winston from 'winston';

// Create a Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    // Log the error using Winston
    logger.error(`Exception: ${JSON.stringify(errorResponse)}`);

    response.status(status).json({
      statusCode: status,
      message: (errorResponse as any).message || 'Internal Server Error',
      error: (errorResponse as any).error || 'Internal Server Error',
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
