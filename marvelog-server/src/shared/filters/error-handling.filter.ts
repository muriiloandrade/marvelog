/* eslint-disable no-param-reassign */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  DBError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  DataError,
} from 'objection';

interface SQLCustomError extends Error {
  sqlMessage?: string;
  code?: string;
  errno?: number;
  sqlState?: number;
}

@Catch(Error)
export class GeneralErrorsFilter implements ExceptionFilter {
  catch(err: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const { body, method, params, query, user, url } =
      ctx.getRequest<Request>();
    const { name, message } = err;
    this.removeSenha(body);

    const timestamp = new Date().toLocaleString('en-GB', {
      timeZone: 'America/Bahia',
      timeZoneName: 'short',
      hour12: false,
    });

    const json = {
      body,
      method,
      params,
      query,
      user,
      url,
      stack: err.stack,
      message,
      timestamp,
      sqlReturn: undefined,
    };

    if (err instanceof UniqueViolationError) {
      res.status(HttpStatus.CONFLICT).send({
        status: HttpStatus.CONFLICT,
        message:
          'Não foi possível cadastrar usuário!\n Este e-mail ou nome de usuário já está em uso!',
      });
      json.sqlReturn = (err.nativeError as SQLCustomError).sqlMessage;
    } else if (err instanceof NotNullViolationError) {
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `O campo ${err.column} é obrigatório!`,
      });
      json.sqlReturn = (err.nativeError as SQLCustomError).sqlMessage;
    } else if (err instanceof ForeignKeyViolationError) {
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: (err.nativeError as SQLCustomError).sqlMessage,
      });
      json.sqlReturn = (err.nativeError as SQLCustomError).sqlMessage;
    } else if (err instanceof DataError) {
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: (err.nativeError as SQLCustomError).sqlMessage,
      });
      json.sqlReturn = (err.nativeError as SQLCustomError).sqlMessage;
    } else if (err instanceof DBError) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
      });
      Logger.error({
        error_name: name,
        error_message: message,
        sqlError: (err.nativeError as SQLCustomError).sqlMessage,
        timestamp,
        path: url,
      });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
      });

      Logger.error({
        error_name: name,
        error_message: message,
        timestamp,
        path: url,
      });
    }
  }

  private removeSenha(body: any): void {
    delete body.str_password_usr;
  }
}
