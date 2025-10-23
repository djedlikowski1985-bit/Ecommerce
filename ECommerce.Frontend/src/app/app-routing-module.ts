import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Categories } from './pages/categories/categories';
import { About } from './pages/about/about';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'products', component: Products },
  { path: 'categories', component: Categories },
  { path: 'about', component: About },
  { path: '**', redirectTo: '' } // Wildcard route for 404s
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
