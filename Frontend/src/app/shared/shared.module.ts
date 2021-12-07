import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IconsModule, MDBBootstrapModule } from "angular-bootstrap-md";
import { AlumniSearchPipe } from "./pipes/alumni-search.pipe";
import { BlogsComponent } from "./blogs/blogs.component";
import { SearchAlumniComponent } from "./search-alumni/search-alumni.component";
import { HomeComponent } from './home/home.component';
import { AlumniProfileComponent } from './alumni-profile/alumni-profile.component';
import { VerifiedPipe } from "./pipes/verified.pipe";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: "blogs", component:BlogsComponent},
    {path:"search" , component:SearchAlumniComponent},
    {path: 'profile/:id', component: AlumniProfileComponent },
]

@NgModule({
    declarations: [
        BlogsComponent,
        SearchAlumniComponent,
        AlumniSearchPipe,
        HomeComponent,
        AlumniProfileComponent,
        VerifiedPipe,
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      IconsModule,
      MDBBootstrapModule.forRoot(),
      RouterModule.forChild(routes)
    ],
    exports: [
        BlogsComponent,
        SearchAlumniComponent,
        AlumniSearchPipe,
        VerifiedPipe,
    ]
})

export class SharedModule {

}