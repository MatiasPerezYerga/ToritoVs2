import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './services/auth.service';
import { faBullhorn }  from '@fortawesome/free-solid-svg-icons';
//import { faceCowboyHat } from '@fortawesome/fontawesome-common-types';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faFish } from '@fortawesome/free-solid-svg-icons';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import {Router } from '@angular/router';

import { Observable } from 'rxjs';
import { UserI } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'torito';
   loader=true;


 
   public user: string;
    public urlTree: any;

   constructor(private http: HttpClient, private router: Router,public authSvc: AuthService){

     this.user="";
   
     if(localStorage.getItem("USERSESION")){
              this.user=(localStorage.getItem("USERSESION") || '{}');
              console.log(localStorage.getItem("USERSESION"));
              console.log("El usuario desde el component es:"+this.user);
       }
     }

      ngOnInit(): void {
    
     //Loader variable set false after page load
    setTimeout(()=>{                           
      this.loader = false;
  }, 2000);
  }


  async onLogout() {
    try {
      await this.authSvc.logout();
     window.location.href = "https://matiasperezyerga.github.io/ToritoVs2/";
    } catch (error) {
      console.log(error);
    }
}

}
