import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';
const routes: Routes = [
  {
    path :'login',
    loadChildren:()=>import('./login/login.module').then(m=> m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path :'cart',
    loadChildren:()=>import('./cart/cart.module').then(m=> m.CartModule),
    canActivate: [AuthGuard],
  },
  {
    path :'home',
    loadChildren:()=>import('./home/home.module').then(m=> m.HomeModule),
  },
  {
    path :'menu',
    loadChildren:()=>import('./menu/menu.module').then(m=> m.MenuModule),
    canActivate: [AuthGuard],
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
