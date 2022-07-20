import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBookComponent } from '../admin-book/admin-book.component';
import { AdminUserComponent } from '../admin-user/admin-user.component';

const routes: Routes = [
  { path: "admin-book", component: AdminBookComponent, title: 'Admin Book' },
  { path: "admin-user", component: AdminUserComponent, title: 'Admin User' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
