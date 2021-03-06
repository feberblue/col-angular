import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { map } from 'rxjs/operators';
import { Respuesta } from './core/models/respuesta';
import { promise } from 'protractor';

export interface BidMessage {
  UserName: string;
  Password: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  ws: WebSocket;
  socketIsOpen = 1;
  public respuesta: string;
  private _logger: string = "";


  constructor() {
  }

  //----------------------------------------------------------------
  /**
   * 
   * @param url 
   */
  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);


    return Observable.create(
      observer => {
        this.ws.onmessage = (event) => {
          observer.next(event.data);
          this._logger = event.data;
        }
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        return () => this.ws.close(1000, 'the user disconnet');
      }
    ).pipe(map(res => res));


  }

  /**
   * 
   * @param login user login
   * @param password password user
   */
  async sendMessage(login: string, password: string) {

    if (this.ws.readyState === this.socketIsOpen) {
      this.ws.send(`{ "UserName": "${login}", "Password": "${password}" }`);

      this.ws.addEventListener("message", (event: MessageEvent) => {
        this._logger = event.data;
      });

      if (this._logger === "" || this._logger === undefined) {
        setTimeout(() => { console.log(this._logger) }, 2000);
      }

      return this._logger;
    } else {
      return "{\"ErrorCode\": 404,\"ErrorMsg\":\"Connection Service not found\"}";
    }
  }

}


