import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from'@angular/forms';
import {HttpClientModule}from'@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmGiftcardComponent } from './components/confirm-giftcard/confirm-giftcard.component';

import{GiftcardService} from './services/giftcard.service';
import {UploadService} from './services/upload.service';
import { ContactComponent } from './components/contact/contact.component';
import { ShowroomComponent } from './components/showroom/showroom.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GiftcardsComponent } from './components/giftcards/giftcards.component';
import { GiftcardComponent } from './components/giftcard/giftcard.component';
import { SuccessComponent } from './components/success/success.component';
import { PendingComponent } from './components/pending/pending.component';
import { FailComponent } from './components/fail/fail.component';
  

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckoutComponent,
    ConfirmGiftcardComponent,
    ContactComponent,
    ShowroomComponent,
    LoginComponent,
    RegisterComponent,
    GiftcardsComponent,
    GiftcardComponent,
    SuccessComponent,
    PendingComponent,
    FailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
     FontAwesomeModule
    
  ],
  providers: [GiftcardService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { 
constructor() {
    library.add(faFilm);
  }
}
