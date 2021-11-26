import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AdminSigninComponent } from "./admin-signin/admin-signin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RequestsComponent } from "./requests/requests.component";

const routes: Routes = [
    {path: "admin/requests", component: RequestsComponent },
    {path: "admin/signin" , component: AdminSigninComponent}
]

@NgModule({
    declarations: [
      AdminSigninComponent,
      DashboardComponent,
      RequestsComponent
    ],
    imports: [
       CommonModule,
       ReactiveFormsModule,
       FormsModule,
       MDBBootstrapModule.forRoot(),
       RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AdminModule {}