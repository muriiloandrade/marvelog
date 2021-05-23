import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorMessages: { message: string[] } = { message: [] };
    Object.assign(errorMessages, exception.getResponse());
    const returnMessage = errorMessages.message.length
      ? errorMessages.message
      : exception.message;

    response.status(status).json({
      message: returnMessage,
      statusCode: status,
      timestamp: new Date().toLocaleString('en-GB', {
        timeZone: 'America/Bahia',
        timeZoneName: 'short',
        hour12: false,
      }),
      path: request.url,
    });
  }
}
