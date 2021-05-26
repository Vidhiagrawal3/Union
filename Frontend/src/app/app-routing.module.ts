import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AlumniHomeComponent} from './alumni-home/alumni-home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BlogsComponent } from './blogs/blogs.component';

const routes : Routes = [
  {path:"login" , component: LoginComponent},
  {path:"register" , component: RegisterComponent},
  {path:"alumni-home",component:AlumniHomeComponent},
  {path: "editprofile", component:EditProfileComponent},
  {path: "blogs", component:BlogsComponent}
  
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
