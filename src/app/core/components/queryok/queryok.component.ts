import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { QuerySetFxService } from '../../services/query-set-fx.service';
import { SetFxModel } from '../../models/setfx.model';
import { RootSetFxModel } from '../../models/rootsetfx.model';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig } from '@angular/material';
import { DetailSetFxComponent } from '../detailsetfx/detailsetfx.component';
import { MessageAlertComponent } from '../message/message.component';
import { AlertModel } from '../../models/alert.model';
import { AlertType } from '../../enums/alert.emun';
import { interval, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


export class HabilitaBotones {
  SetFxObject: string;
  habilita: boolean;
  timefin: number;

  constructor(SetFxId: string, enable: boolean) {
    this.SetFxObject = SetFxId;
    this.habilita = enable;
    this.timefin = (new Date().getTime() / 1000) + 10;
  }
}

@Component({
  selector: 'app-queryok',
  templateUrl: './queryok.component.html',
  styleUrls: ['./queryok.component.css']
})
export class QueryokComponent implements AfterViewInit, OnDestroy, OnInit {

  //@ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  arrayRootSetFx: RootSetFxModel;
  alertConfig: AlertModel;
  arrayQuery: SetFxModel[] = [];
  filterData: string = "Done";
  arrayHabilita: HabilitaBotones[] = [];
  selectSetfx: SetFxModel;

  dtOptions: DataTables.Settings = {};
  objArray: string[] = ["Done", "Pending", "Error"];

  dtTrigger: Subject<any> = new Subject();

  dataSource: MatTableDataSource<SetFxModel>;
  displayedColumns: string[] = ['Consecutive', 'DealId', 'SetFxId', 'Status', 'Action', 'PrincipalAmount', 'UserFx', 'ErrorMessage', 'Operations'];

  /**
   * Method OnInit the component
   */
  ngOnInit() {
    this.arrayQuery = [];
    this.renderMaterialDataTable();
    interval(10000).subscribe(s => {
      //console.log("arrayHabilita -> ")
      //console.log(this.arrayHabilita)
      this.getAllData();
    });

    this.dtOptions = {
      pageLength: 5,
      processing: true
    };

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Method Implement OnAfter View Init the Component
   */
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  /**
   * Do not forget to unsubscribe the event 
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  /**
   * Re Render DataTable Object in Page 
   */
  /*rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again      
      this.dtTrigger.next();
    });
  }*/


  /**
   * 
   * @param _query : Service QuerySetFxService
   * @param router : Router Module
   * @param dialog : Class Dialog of Angular Material
   */
  constructor(private _query: QuerySetFxService,
    private router: Router,
    public dialog: MatDialog) {

    this.getAllData();

  }
  /**
   * Return filterData Selection for Select Control Filter
   */
  get selectFilterData() {
    return this.filterData;
  }

  /**
   * Set filterData Selection for Select Control Filter
   */
  set selectFilterData(value) {
    this.filterData = value;
  }

  /**
   * 
   * @param item: Object SetFxModel take for disabled botton after click
   */
  public sendQuery(item: SetFxModel): void {
    this._query.processError(item).subscribe(res => {
      item.Habilitado = false;
      this.getAllDataFilter(item);
      this.openAlert("A re-processing of the request has been sent: " + item.SetFx_Id, AlertType.SUCCESS.toString());
    }, error => {
      this.openAlert(error.error, AlertType.ERROR.toString());
    });
  }

  /**
   * Get all Information of service blotter depending of state selection
   */
  public getAllData() {
    this.arrayQuery = [];
    this.deleteItemHabilita();
    this._query.getAllData(this.filterData).subscribe(res => {
      this.arrayRootSetFx = res as RootSetFxModel;
      this.arrayQuery = this.arrayRootSetFx.root;
      if (this.arrayQuery !== null && this.arrayQuery.length > 0) {
        this.arrayQuery.forEach(item => {
          item.Habilitado = true;
          item.MessageFormat = JSON.parse(item.Message);
          if (this.arrayHabilita !== null && this.arrayHabilita.length > 0) {
            //console.log(this.arrayHabilita);
            this.arrayHabilita.forEach(obj => {
              if (obj.SetFxObject === item.SetFx_Id) {
                //console.log("item encontrado y Deshabilitado: " + item.SetFx_Id + ", " + obj.habilita);
                item.Habilitado = obj.habilita;
              }
            });
          }
        });

      } else {
        this.arrayQuery = [];
      }

      this.renderMaterialDataTable();

    }, error => {
      console.log(JSON.stringify(error));
    });

  }

  /**
   * Delete item in array Habilita for disable/enable button
   * in Table when past time 10 Seg
   */
  deleteItemHabilita() {
    var tempFinal = new Date().getTime() / 1000;
    //console.log(tempFinal) ;
    if (this.arrayHabilita.length > 0) {
      for (var i = 0; i <= this.arrayHabilita.length - 1; i++) {
        if (tempFinal >= this.arrayHabilita[i].timefin) {
          this.arrayHabilita.splice(i, 1);
          //console.log("Eliminado Entrada a ArrayHabilita");
          //console.log(this.arrayHabilita);          
        }
      }
    }
  }

  /**
   * Render Table Material Angular
   */
  renderMaterialDataTable() {
    this.dataSource = new MatTableDataSource<SetFxModel>();
    this.dataSource.data = this.arrayQuery;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Get all information depending of method getAllData add with parameter
   * Object SetFxModel for button disabled/enabled, after the method instance
   * in DataTable 
   * @param objetoSetFx : Object SetFxModel
   */
  public getAllDataFilter(objetoSetFx: SetFxModel) {
    this.arrayQuery = [];
    this._query.getAllData(this.filterData).subscribe(res => {
      this.arrayRootSetFx = res as RootSetFxModel;
      this.arrayQuery = this.arrayRootSetFx.root;
      if (this.arrayQuery !== null && this.arrayQuery.length > 0) {
        this.arrayQuery.forEach(item => {
          item.MessageFormat = JSON.parse(item.Message);
          if (item.SetFx_Id === objetoSetFx.SetFx_Id) {
            //console.log("Item encontrado y se crea nuevo objeto dentro de arrayHabilitado")
            item.Habilitado = objetoSetFx.Habilitado;
            let habilitado = new HabilitaBotones(item.SetFx_Id, objetoSetFx.Habilitado);
            this.arrayHabilita.push(habilitado);
            //console.log(this.arrayHabilita);
          }
        });
      } else {
        this.arrayQuery = [];
      }
      this.renderMaterialDataTable();
    }, error => {
      console.log(JSON.stringify(error));
    });
  }

  /**
   * Method used for call getAllData for filter ComboBox
   * @param data 
   */
  public changeData(data) {
    this.getAllData();
  }

  /**
   * Implement call for Show Dialog. This Containe the Detail SetFx
   * @param itemSetfx : Item Select in Buttom on DataTable Angular Material
   */
  public viewDetail(itemSetfx: any) {
    this.selectSetfx = <SetFxModel>itemSetfx;
    this.openDialog();
  }

  /**
   * Open Detail SetFx for SetFx_Id
   */
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.selectSetfx;
    dialogConfig.width = "90%";
    const dialogRef = this.dialog.open(DetailSetFxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      //this.animal = result;
    });
  }

  /**
   * Open Message to User
   * @param textMessage Text Message to show a user
   * @param typeMessage Type Message (Error, Success, Warning)
   */
  openAlert(textMessage: string, typeMessage: string): void {
    this.alertConfig = new AlertModel();
    this.alertConfig.messageText = textMessage;
    this.alertConfig.messageType = typeMessage;
    const alertDialog = new MatDialogConfig();
    alertDialog.data = this.alertConfig;
    const dialogAlertRef = this.dialog.open(MessageAlertComponent, alertDialog);

    dialogAlertRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }

  /**
   * Call function to Show Message Error Generic
   * @param errorString : Error to show a user
   */
  showError(errorString: string) {
    this.openAlert(errorString, AlertType.ERROR.toString());
  }


  /**
   * Implement flitered to Angular Material DataTable
   * @param filterValue 
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Please Implement Method for Read forlder contains Files TXT
   */
  readFiletxt() {
    this._query.readtxt("app/txt/archivo.txt").subscribe(res => {
      //console.log(res);
    });
  }

}
