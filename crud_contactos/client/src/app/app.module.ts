import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { PhoneCardComponent } from './components/phone-card/phone-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactCardComponent,
    PhoneCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
