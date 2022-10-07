import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//importa nuestras interfaces
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
//importamos un operador de la libreria RXJS
import { tap } from 'rxjs/operators';

//Para evaluar una propiedad de estado  importamos el Behavior subjet de RXJS e instanciamos un BehavuirSubjetc<boolean>
import {Observable, BehaviorSubject} from 'rxjs';

//Importamos el router
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({  providedIn: 'root'})


export class AuthService {

//creamos 2 propiedades de nuestro server
//Para Sandbox
  //AUTH_SERVER: string = 'http://localhost:3000/api';

 //Para PROD
  AUTH_SERVER: string = 'https://api-torito-giftcard-nodejs.herokuapp.com/api';
  authSubject = new BehaviorSubject(false);
  private token: any;
  private helper = new JwtHelperService();
  //private Desol= new BehaviorSubject(false);

 /* get isLogged(): Observable<boolean>{
    return this.authSubject.asObservable();
  }
*/


//En el constructor hay que inyectar el HTTP
  constructor(private httpClient: HttpClient, private router: Router) { 
    this.token='';
  }

//creamos los métodos

  register(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn,res.dataUser.name);
          }
        })
      );
  }

  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
        
        (res: JwtResponseI) => {
          
          console.log(res);

          if (res) {
                  
            // guardar token en el local STORAGE
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn,res.dataUser.name);
            //this.router.navigate(['/prueba']);
            console.log("Ha ingresado correctamente.");
            console.log(res.dataUser.accessToken, res.dataUser.expiresIn)
            
            //Seteamos la propiedad is Logged true
           
              console.log("El authSubject en la respuesta del login es: " + this.authSubject);
             console.log(this.authSubject);
             console.log("ACA VA EL EXPIRE");
             console.log(res.dataUser.expiresIn);

            


          }
        },
        (err)=> console.log("Como te atreves a ingresar algo incorrecto!")

        )
      );
  }

  logout(): void {

    this.authSubject.next(false);
    this.token = '';
    sessionStorage.removeItem("ACCESS_TOKEN");
    sessionStorage.removeItem("EXPIRES_IN");
    sessionStorage.removeItem("USERSESION");
    
//set userIsLogged= false  Es una propiedad para indicar que deslogeo
    
    console.log("EL authSubject es :"+this.authSubject.value);
    window.location.reload()

 
  }



  private saveToken(token: string, expiresIn: string,usersesion: string): void {
    sessionStorage.setItem("ACCESS_TOKEN", token);
    sessionStorage.setItem("EXPIRES_IN", expiresIn);
    sessionStorage.setItem("USERSESION",usersesion);
    this.token = token;

//That is, the data stored in localStorage persists until explicitly deleted. Changes made are saved and available for all current and future visits to the site.

//For sessionStorage, changes are only available per tab. Changes made are saved and available for the current page in that tab until it is closed. Once it is closed, the stored data is deleted.



  }



  private getToken(): string {
    if (!this.token) {
      this.token = sessionStorage.getItem(("ACCESS_TOKEN") || '{}');

    }
    return this.token;
  }

 //FALTA EL CHECK TOKEN PARA VERIFICAR EL TIEMPO DE EXPIRACION... tIME 1 H 37 MIN ANGULAR LOGIN USER TUTORIAL ESPAÑOL
 /* tambien podemos escribir en una sola linea*/

    loggedIn(): any{
    
    const token = this.getToken();
    console.log("Debugging Logged")
    console.log(token);
    console.log("El token está expirado??");
    console.log(this.helper.isTokenExpired(token));
    const expirationDate = this.helper.getTokenExpirationDate(token);

    console.log(expirationDate);
    console.log(Date())

if(!this.helper.isTokenExpired(token)){
 return !this.helper.isTokenExpired(token);

}else{
  console.log("que paso ?");
   this.authSubject.next(false);
   sessionStorage.removeItem("ACCESS_TOKEN");
    sessionStorage.removeItem("EXPIRES_IN");
    sessionStorage.removeItem("USERSESION");
   window.location.href = "http://localhost:4200/login"
    
    

    /*setTimeout(()=>{                           
      
      
  }, 1000);*/
}

    
    


    //return !this.helper.isTokenExpired();
   


    
    }

 /*!!localStorage.getItem('token');*/
}
