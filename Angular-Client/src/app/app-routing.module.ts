import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { PersonStatusComponent } from './person-status/person-status.component';
import { RolesComponent } from './roles/roles.component';
import { NewPersonComponent } from './new-person/new-person.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'auth',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: UserStatusComponent
      },
      {
        path: 'user',
        component: NewUserComponent
      },
      {
        path: 'user-status',
        component: UserStatusComponent
      },
      {
        path: 'person-status',
        component: PersonStatusComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      },
      {
        path: 'person',
        component: NewPersonComponent
      },
      {
        path: 'person/:uid',
        component: NewPersonComponent
      },
      {
        path: 'person/:uid/:act',
        component: NewPersonComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
