import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService, BidMessage } from '../websocket.service';
import { Subscription, Observable, Subject, combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-clientws',
  templateUrl: './clientws.component.html',
  styleUrls: ['./clientws.component.css']
})
export class ClientwsComponent implements OnInit, OnDestroy {

  latestBids$: Observable<string>;
  messageForServe: string;
  wsSubscription: Subscription;
  status;
  msgGeneral: any;
  visibilidadMsg: boolean = false;

  txtLogin: string;
  txtPassword: string;
  variable: BidMessage;

  constructor(private readonly wsClient: WebsocketService) {
    this.wsSubscription = this.wsClient.createObservableSocket("ws://10.236.4.20:9000")
      .subscribe(
        data => this.messageForServe = data,
        err => console.log(err),
        () => console.log('The Observable stream is complete')
      );
  }

  sendMessageToServer() {
    this.status = this.wsClient.sendMessage(this.txtLogin, this.txtPassword)
    setTimeout(() => {
      this.status = this.wsClient.sendMessage(this.txtLogin, this.txtPassword)
      console.log(this.status);
      this.messageForServe = this.status.__zone_symbol__value;
      console.log(this.messageForServe);


      if (this.messageForServe === "" || this.messageForServe===undefined) {      
        this.visibilidadMsg = false;
      } else {
        this.msgGeneral = JSON.parse(this.messageForServe);
        this.visibilidadMsg = true;
      }
      
    }, 1000);

    
  }

  closeSocket() {
    this.wsSubscription.unsubscribe();
    this.status = 'Socket is closed';
  }

  ngOnDestroy(): void {
    this.closeSocket();
  }

  ngOnInit() {
    /*this.latestBids$ = combineLatest(
      this.productChange$.pipe(startWith(this.variable)),
      this.wsClient.userLogin$.pipe(startWith<BidMessage | null>(null)),
      (login, bid) => bid && bid.UserName == login.UserName ? bid.Password : login.Password
    );*/
  }

  sendLogin() {
    console.log(this.txtLogin);
    console.log(this.txtPassword);
    //this.wsClient.placeBid(this.txtLogin, this.txtPassword);


  }

}
