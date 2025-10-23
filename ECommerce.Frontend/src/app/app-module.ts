import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// Angular Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Categories } from './pages/categories/categories';
import { About } from './pages/about/about';
import { Navbar } from './pages/navbar/navbar';

@NgModule({
  declarations: [
    App,
    Home,
    Products,
    Categories,
    About,
    Navbar
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
