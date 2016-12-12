import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import { AppComponent }  from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
// Pages
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { MpDataComponent } from './components/pages/mpData/mpData.component';

@NgModule({
  imports:      [ BrowserModule, routing, FormsModule, HttpModule ],
  declarations: [ 
          AppComponent, 
          NavbarComponent,
          HomeComponent,
          AboutComponent,
          MpDataComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }