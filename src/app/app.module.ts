import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule, 
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

//import { DataTablesModule } from 'angular-datatables';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './core/components/page404/page404.component';
import { QueryerrorsComponent } from './core/components/queryerrors/queryerrors.component';
import { QueryokComponent } from './core/components/queryok/queryok.component';
import { ServiceStatusComponent } from './core/components/servicestatus/servicestatus.component';
import { DetailSetFxComponent } from './core/components/detailsetfx/detailsetfx.component';
import { NavbarComponent } from './core/template/navbar/navbar.component';
import { FooterComponent } from './core/template/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MessageAlertComponent } from './core/components/message/message.component';
import { ClientwsComponent } from './clientws/clientws.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Page404Component,
    QueryerrorsComponent,
    QueryokComponent,
    ServiceStatusComponent,
    DetailSetFxComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MessageAlertComponent,
    ClientwsComponent,
    
  ],
  entryComponents:[MessageAlertComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,    
    MatIconModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
