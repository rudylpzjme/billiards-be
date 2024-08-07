export class ErrorBase<M extends string> extends Error {
  name: M;
  message: string;
  cause?: any;

  constructor({name, message, cause}: {
    name: M,
    message: string,
    cause?: any
  }) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}
