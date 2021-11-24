import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AlumniHomeComponent} from './alumni-home/alumni-home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BlogsComponent } from './blogs/blogs.component';
import { SearchAlumniComponent } from './search-alumni/search-alumni.component';
import { RequestsComponent } from './admin/requests/requests.component';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';

const routes : Routes = [
  {path:"login" , component: LoginComponent},
  {path:"register" , component: RegisterComponent},
  {path:"alumni-home",component:AlumniHomeComponent},
  {path: "editprofile", component:EditProfileComponent},
  {path: "blogs", component:BlogsComponent},
  {path:"search-alumni" , component:SearchAlumniComponent},
  {path: "admin/requests", component: RequestsComponent },
  {path: "admin/signin" , component: AdminSigninComponent}
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
