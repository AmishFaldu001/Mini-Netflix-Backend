/**
 * Custom http error class to identify error message to send to response
 */
export class CustomHttpError {
  /**
   * @property statuscode - Http status code
   */
  statuscode: number;

  /**
   * @property message - Customer message to send to http response
   */
  message: string;

  constructor({
    message,
    statuscode,
  }: {
    statuscode: number;
    message: string;
  }) {
    this.statuscode = statuscode;
    this.message = message;
  }
}
