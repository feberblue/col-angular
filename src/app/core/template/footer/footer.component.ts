import { Component, OnInit } from '@angular/core';
import { QuerySetFxService } from '../../services/query-set-fx.service';
import { ServiceOnLine } from '../../models/serviceonline.model';
import { QueryForwardService } from '../../services/query-forward.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public annioActual: number;
  public _serSwap: ServiceOnLine;
  public _serForward: ServiceOnLine;
  public _serExample: ServiceOnLine;

  /**
   * Add the All Services for test connection
   * @param _sSwap 
   * @param _sForw 
   */
  constructor(private _sSwap: QuerySetFxService, private _sForw: QueryForwardService) { }

  /**
   * Add implementation for call method read serveces
   */
  ngOnInit() {
    this._serSwap = this.getServiceSwap();
    //this._serForward = this.getServiceForward();
    this._serExample = this.getserviceExample();
  }


  /**
   * Add Method read a services, with return ServiceOnLine object
   */

  /**
   * Comprueba la disponibilidad del Servicio Swap Blotter
   */
  getServiceSwap(): ServiceOnLine {
    let servicio1 = new ServiceOnLine();
    servicio1.service = "SWAP";
    this._sSwap.getAllData("Done").subscribe(res => {
      if (res === null) {
        servicio1.onLineColor = "red";
      } else {
        servicio1.onLineColor = "green";
      }
    }, error => {
      servicio1.onLineColor = "red";
    });
    //console.log(servicio1);
    return servicio1;
  }

  /**
   * Comprueba la disponiblidad del Servicio Forward
   */
  getServiceForward(): ServiceOnLine {
    let servicio = new ServiceOnLine();
    servicio.service = "Forward";
    this._sForw.getAllData("Done").subscribe(res => {
      if (res === null) {
        servicio.onLineColor = "red";
      } else {
        servicio.onLineColor = "green";
      }
    }, error => {
      servicio.onLineColor = "red";
    });
    //console.log(servicio);
    return servicio;
  }









  /**
   * Prueba de servicio externo
   */
  getserviceExample(): ServiceOnLine {
    let servicio = new ServiceOnLine();
    servicio.service = "Example";
    this._sSwap.getDataExample().subscribe(res => {
      if (res === null) {
        servicio.onLineColor = "red";
      } else {
        servicio.onLineColor = "green";
      }
    }, error => {
      servicio.onLineColor = "red";
    });
    //console.log(servicio);
    return servicio;
  }

}


