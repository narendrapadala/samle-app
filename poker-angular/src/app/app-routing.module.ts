import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SettlementComponent } from './components/settlement/settlement.component';
import { TableComponent } from './components/table/table.component';
import { UserAuthService } from './services/user-auth.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [UserAuthService]},
  {path: 'settlement', component: SettlementComponent, canActivate: [UserAuthService]},
  {path: 'table', component: TableComponent},
  {path: '**', redirectTo: 'table'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
