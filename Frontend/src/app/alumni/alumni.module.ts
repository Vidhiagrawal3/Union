import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IconsModule, MDBBootstrapModule } from "angular-bootstrap-md";
import { AlumniProfileComponent } from "../shared/alumni-profile/alumni-profile.component";
import { EventsComponent } from "../shared/events/events.component";
import { SharedModule } from "../shared/shared.module";
import { AlumniHomeComponent } from "./alumni-home/alumni-home.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    {path:"login" , component: LoginComponent},
    {path:"register" , component: RegisterComponent},
    {path:"alumni-home",component:AlumniHomeComponent},
    {path: "editprofile", component:EditProfileComponent},
]

@NgModule({
 declarations: [
     AlumniHomeComponent,
     EditProfileComponent,
     LoginComponent,
     RegisterComponent,
 ],
 imports: [
    CommonModule,
    SharedModule,
     ReactiveFormsModule,
     FormsModule,
     IconsModule,
     MDBBootstrapModule.forRoot(),
     RouterModule.forChild(routes),
 ],
 exports: [RouterModule]
})

export class AlumniModule {

}