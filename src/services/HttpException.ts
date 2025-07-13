export default class HttpException extends Error {
  message: string;
  internalCode: string;
  info?: any;

  constructor(message: string, internalCode: string, info?: any) {
    super(message);
    this.message = message;
    this.internalCode = internalCode;
    this.info = info;
  }
}
