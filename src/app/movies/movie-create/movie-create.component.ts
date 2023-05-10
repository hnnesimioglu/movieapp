import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from "../../services/category.service";
import { MovieService } from '../movie.service';
import { AlertifyService } from "../../services/alertify.service";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [CategoryService, MovieService, AlertifyService]
})
export class MovieCreateComponent implements OnInit {

  categories: Category[];
  model: any = {
    categoryId: ''
  };

  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private router: Router,
    private alertify: AlertifyService
  ) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  movieForm = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(5)]),
    description: new FormControl("", [Validators.required]),
    imageUrl: new FormControl("", [Validators.required]),
    categoryId: new FormControl("", [Validators.required])
  });

  get title() {
    return this.movieForm.get('title');
  }

  clearForm() {
    this.movieForm.patchValue({
      title: '',
      description: '',
      imageUrl: '',
      categoryId: '',
    })
  }
  createMovie() {
    const extensions = ['jpeg', 'jpg', 'png'];
    const extension = this.movieForm.value.imageUrl.split('.').pop();
    if (extensions.indexOf(extension) === -1) {
      this.alertify.error('Image extensions must be jpeg, jpg or png');
    } else {
      const movie = {
        id: 0,
        title: this.movieForm.value.title,
        description: this.movieForm.value.description,
        imageUrl: this.movieForm.value.imageUrl,
        isPopular: false,
        datePublished: new Date().getTime(),
        categoryId: this.movieForm.value.categoryId
      };

      this.movieService.createMovie(movie).subscribe(data => {
        this.router.navigate(['/movies'])
      });
    }
  }

  log(title: any) {
    console.log(title);
  }
}
