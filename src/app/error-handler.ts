import { ErrorHandler } from '@angular/core';

export class AlertErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error: any) {
    const msg: string = 'rejection' in error ? error.rejection.message : error.message;
    if (msg) {
      alert(msg);
    }
  }
}
