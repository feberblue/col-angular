import { Component, OnDestroy } from '@angular/core';
import { LoginService } from './core/services/login.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoginService]
})
export class AppComponent implements OnDestroy{

  title = 'setfxweb'; 
  
  ngOnDestroy(): void {
    localStorage.removeItem("currentUser");
    localStorage.clear();
  }

  
}
