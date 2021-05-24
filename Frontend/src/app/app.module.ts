import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// MDB Angular Free
import { IconsModule } from 'angular-bootstrap-md'
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import{AlumniService} from './services/alumni.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlumniHomeComponent } from './alumni-home/alumni-home.component';
import { HeaderComponent } from './header/header.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthInterceptor } from './services/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlumniHomeComponent,
    HeaderComponent,
    EditProfileComponent
  ],
  imports: [
    FormsModule,ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    MDBBootstrapModule.forRoot(),

  ],
  providers: [AlumniService ,{provide:HTTP_INTERCEPTORS , useClass:AuthInterceptor , multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
