import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', loadChildren: () => import('./movies/movies.module').then(movies => movies.MoviesModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(auth => auth.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
