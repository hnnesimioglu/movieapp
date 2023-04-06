import {Pipe, PipeTransform} from '@angular/core';
import {Movie} from "../models/movie";

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

  transform(movies: Movie[], filterText: string): Movie[] {
    filterText = filterText.toLowerCase();

    // console.log(filterText);
    // console.log(movies);

    return filterText ? movies.filter((movie: Movie) => movie.title.toLowerCase().indexOf(filterText) !== -1 ||
        movie.description.toLowerCase().indexOf(filterText) !== -1
      ) :
      movies;

  }

}
