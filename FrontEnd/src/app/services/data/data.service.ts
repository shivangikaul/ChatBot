import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  messages = [];
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  saveMessage(message: any) {
    this.messages = message;
  }

  getMessage() {
    if (this.messages.length == 0) {
      return [];
  }
  else {
    return this.messages;
  }
}
}