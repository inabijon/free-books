import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin/admin.module').then((m) => m.AdminModule),
  }, {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
