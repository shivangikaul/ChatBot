import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable,Subject } from 'rxjs';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { Message } from '../../models/message'

@Injectable()
export class ChatService {

  private subject = new Subject<any>();
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  private idNgrok: string = '9d350345';
  private urlNgrok: string ='http://' + this.idNgrok + '.ngrok.io';
  // private urlSendMessage: string = this.idNgrok ? this.urlNgrok + '/message/' : 'localhost:8000/message/';
  private urlSendMessage: string = "http://192.168.60.50:4000/chatbot/talk";
  public data= {};
  constructor(private http: Http) { }

    sendMessage(message: any) {
      this.subject.next(message);
      return this.http.post(this.urlSendMessage, message, this.options)
  }

  
}