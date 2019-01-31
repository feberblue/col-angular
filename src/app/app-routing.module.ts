import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { Page404Component } from './core/components/page404/page404.component';
import { QueryokComponent } from './core/components/queryok/queryok.component';
import { QueryerrorsComponent } from './core/components/queryerrors/queryerrors.component';
import { ServiceStatusComponent } from './core/components/servicestatus/servicestatus.component';
import { DetailSetFxComponent } from './core/components/detailsetfx/detailsetfx.component';
import { HomeComponent } from './home/home.component';
import { ClientwsComponent } from './clientws/clientws.component';

const routes: Routes = [
  { path: '', component: ClientwsComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'swap', component: QueryokComponent, canActivate: [AuthGuard] },
  { path: 'forward', component: QueryerrorsComponent, canActivate: [AuthGuard] },
  { path: 'status', component: ServiceStatusComponent, canActivate: [AuthGuard] },
  { path: 'detail', component: DetailSetFxComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }