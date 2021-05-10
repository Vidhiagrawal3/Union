import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// MDB Angular Free
import { IconsModule } from 'angular-bootstrap-md'
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import{AlumniService} from './services/alumni.service'
import { HttpClientModule } from '@angular/common/http';
import { AlumniHomeComponent } from './alumni-home/alumni-home.component';
const approute : Routes = [
{path:"login" , component: LoginComponent},
{path:"register" , component: RegisterComponent},
{path:'alumni-home',component:AlumniHomeComponent}

]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlumniHomeComponent
  ],
  imports: [
    FormsModule,ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(approute)
  ],
  providers: [AlumniService],
  bootstrap: [AppComponent]
})
export class AppModule { }
