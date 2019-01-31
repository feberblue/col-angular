import { Component, OnInit } from '@angular/core';
import { QuerySetFxService } from '../../services/query-set-fx.service';
import { SetFxModel } from '../../models/setfx.model';
import { RootSetFxModel } from '../../models/rootsetfx.model';
import { QueryForwardService } from '../../services/query-forward.service';

@Component({
  selector: 'app-queryerrors',
  templateUrl: './queryerrors.component.html',
  styleUrls: ['./queryerrors.component.css']
})
export class QueryerrorsComponent implements OnInit {

  constructor(private _query: QueryForwardService) { }

  arrayQuery : RootSetFxModel;

  ngOnInit() {
    this.getAllData();
  }

  public sendQuery(id: number) : void{

  }

  public getAllData(){
    this._query.getAllData("Done").subscribe(res=>{           
      this.arrayQuery = res as RootSetFxModel;      
    }, error=>{
      console.log(JSON.stringify(error));
    });
  }

}
