import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IconsModule, MDBBootstrapModule } from "angular-bootstrap-md";
import { AlumniSearchPipe } from "../pipes/alumni-search.pipe";
import { BlogsComponent } from "./blogs/blogs.component";
import { SearchAlumniComponent } from "./search-alumni/search-alumni.component";

const routes: Routes = [
    {path: "blogs", component:BlogsComponent},
  {path:"search-alumni" , component:SearchAlumniComponent}
]

@NgModule({
    declarations: [
        BlogsComponent,
        SearchAlumniComponent,
        AlumniSearchPipe,
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
        AlumniSearchPipe
    ]
})

export class SharedModule {

}