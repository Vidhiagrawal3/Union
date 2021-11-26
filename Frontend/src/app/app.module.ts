import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IconsModule } from 'angular-bootstrap-md'
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { AlumniService } from './services/alumni.service'
import { BlogService } from './services/blog.service';
import { AdminService } from './services/admin.service';
import { AlumniModule } from './alumni/alumni.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    FormsModule,ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    MDBBootstrapModule,
    AlumniModule,
    AdminModule,
    SharedModule
  ],
  providers: [AlumniService, BlogService , AdminService,
    {provide:HTTP_INTERCEPTORS , useClass:AuthInterceptor , multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
