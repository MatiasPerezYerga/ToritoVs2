import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ConfirmGiftcardComponent} from './components/confirm-giftcard/confirm-giftcard.component';
import {ContactComponent} from './components/contact/contact.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ShowroomComponent} from './components/showroom/showroom.component';
import {GiftcardsComponent} from './components/giftcards/giftcards.component';
import {GiftcardComponent} from './components/giftcard/giftcard.component';
import {AuthGuard} from './services/auth.guard'; 
import {SuccessComponent} from './components/success/success.component';

const routes: Routes = [




{path:'home', component:HomeComponent},
{path:'checkout', component:CheckoutComponent},
//{path:'confirmgiftcard', component:ConfirmGiftcardComponent},
{path:'contact',component:ContactComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent,canActivate:[AuthGuard]},
//{path: 'showroom', component: ShowroomComponent},
{path: 'giftcards', component: GiftcardsComponent,canActivate:[AuthGuard]},
{path:'giftcard-edit/:id', component: GiftcardComponent,canActivate:[AuthGuard]},
{path:'success',component: SuccessComponent},
{ path: '**', pathMatch: 'full', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
