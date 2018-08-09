import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';
import { DataComponent } from './components/data/data.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Guards
import { AuthenticationGuard } from './guards/authentication-guard';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'data',
    component: DataComponent,
  },
  {
    path: 'profile',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class RoutingConfig {}
