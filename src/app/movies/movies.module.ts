import { NgModule } from "@angular/core";
import { MovieCreateComponent } from "./movie-create/movie-create.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MovieFilterPipe } from "./movie-filter.pipe";
import { MovieComponent } from "./movie/movie.component";
import { MoviesHomeComponent } from "./movies-home/movies-home.component";
import { MoviesComponent } from "./movies.component";
import { SummaryPipe } from "./summary.pipe";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        MoviesComponent,
        MovieComponent,
        MovieDetailsComponent,
        SummaryPipe,
        MovieFilterPipe,
        MovieCreateComponent,
        MoviesHomeComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        MoviesComponent,
        MovieComponent,
        MovieDetailsComponent,
        SummaryPipe,
        MovieFilterPipe,
        MovieCreateComponent,
        MoviesHomeComponent,
    ],
})
export class MoviesModule { }