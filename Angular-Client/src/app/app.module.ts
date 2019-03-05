import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// importing forms module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// importing routing module
import { AppRoutingModule } from './app-routing.module';

// importing components
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NewPersonComponent } from './new-person/new-person.component';
import { NewUserComponent } from './new-user/new-user.component';
import { PersonStatusComponent } from './person-status/person-status.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { RolesComponent } from './roles/roles.component';

// importing service
import { LoginService } from './service/app.logic.service';
import { NewUserService } from './service/app.new-user.service';
import { UserFilterPipe } from './pipe/user-filter-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    NewPersonComponent,
    NewUserComponent,
    PersonStatusComponent,
    UserStatusComponent,
    RolesComponent,
    UserFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [LoginService, NewUserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
