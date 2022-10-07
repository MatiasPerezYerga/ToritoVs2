import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
         

  }



onLogin(form: any): void {
    this.authService.login(form.value).subscribe(res => {

     //this.router.navigateByUrl('/giftcards?authSubject=true');// Si el usuario puede hacer login lo redireccionamos ahi.
       window.location.href = "https://matiasperezyerga.github.io/ToritoVs2/giftcards?authSubject=true";
      //DEBERIA AGREGAR ALGO AL LOGIN NEGADO
    });
  }

}
