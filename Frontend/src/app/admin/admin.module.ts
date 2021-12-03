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
      }
    ]}
]

@NgModule({
    declarations: [
      AdminSigninComponent,
      DashboardComponent,
      RequestsComponent,
      AdminHomeComponent
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