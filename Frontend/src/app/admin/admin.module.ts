import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AdminSigninComponent } from "./admin-signin/admin-signin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RequestsComponent } from "./requests/requests.component";
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SharedModule } from "../shared/shared.module";
import { SearchAlumniComponent } from "../shared/search-alumni/search-alumni.component";
import { AdminService } from "./services/admin.service";
import { BlogsComponent } from "../shared/blogs/blogs.component";
import { AlumniProfileComponent } from "../shared/alumni-profile/alumni-profile.component";
import { VerifiedPipe } from "../shared/pipes/verified.pipe";
import { EventsComponent } from "../shared/events/events.component";

const routes: Routes = [
    {path: "adminsignin" , component: AdminSigninComponent},
    {path: 'admin' , component: AdminHomeComponent, children: [
      {
        path: '', redirectTo: 'requests', pathMatch: 'full'
      },
      {
        path: 'requests' , component: RequestsComponent 
      },
      {
        path: 'search' , component: SearchAlumniComponent
      },
    {path:"events",component:EventsComponent},

{
  path:'blogs' , component: BlogsComponent
},
{
  path:':id' , component: AlumniProfileComponent
}
    ]}
]

@NgModule({
    declarations: [
      AdminSigninComponent,
      DashboardComponent,
      RequestsComponent,
      AdminHomeComponent,
    ],
    imports: [
       CommonModule,
       ReactiveFormsModule,
       FormsModule,
       SharedModule,
       MDBBootstrapModule.forRoot(),
       RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: [AdminService]
})

export class AdminModule {}