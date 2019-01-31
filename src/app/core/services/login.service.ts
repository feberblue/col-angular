import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { Session } from '../models/session.model';
import { LoginObject } from '../models/login-object.model';
import { URL_SERVICE } from './config';
import { StorageService } from './storage.service';
import { LoginkondorService } from './loginkondor.service';
import { Respuesta } from '../models/respuesta';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  wsSubscription: Subscription;
  baseUrl: string = URL_SERVICE.URL_LOGIN;
  status: any;
  messageForServe: string = "";
  visibilidadMsg: boolean = false;
  msgGeneral: Respuesta;


  constructor(private _http: HttpClient, private storage: StorageService, private loginKondor: LoginkondorService) { 
    this.wsSubscription = this.loginKondor.createObservableSocket("ws://10.236.4.20:9000")
      .subscribe(
        data => this.messageForServe = data,
        err => console.log(err),
        () => console.log('The Observable stream is complete')
      );
  }


 

  isLogged() {
    return this.storage.isAuthenticated();

    //let response = this._http.get<any>(this.baseUrl);
    //return response;

  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  login(loginObj: LoginObject): Observable<Session> {
    console.log(loginObj);


    this.status = this.loginKondor.sendMessage(loginObj.username, loginObj.password);
    setTimeout(() => {
      this.status = this.loginKondor.sendMessage(loginObj.username, loginObj.password);
      
      this.messageForServe = this.status.__zone_symbol__value;
      
      if (this.messageForServe === "" || this.messageForServe === undefined) {
        this.visibilidadMsg = false;
      } else {
        this.msgGeneral = JSON.parse(this.messageForServe);
        this.visibilidadMsg = true;

        switch(this.msgGeneral.ErrorCode){
          case 404: break;
          case -58: break;
        }
        
      }

    }, 1000);



    //return this._http.post<Session>(this.baseUrl, loginObj);
    var session = new Session();
    session.token = "HYRE_olou7654654123dtiurdyew76t3455684.kdi54";
    session.user = { id: 1, name: 'Luis', surname: 'beleno', email: 'beleluis@colpatria.com', username: 'beleluis' };

    return of(session);

  }


}
