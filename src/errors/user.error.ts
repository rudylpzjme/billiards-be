import { ErrorBase } from "./error.base";

type ErrorName = 
  | 'USER_NOT_FOUND'
  | 'USER_ALREADY_EXISTS'
  | 'USER_PASSWORD_INCORRECT'
  | 'USER_PASSWORD_DOESNT_MATCH'
  | 'USER_DATA_EMPTY';

export class UserError extends ErrorBase<ErrorName> {}
