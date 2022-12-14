import { Component, OnInit } from '@angular/core';
import{Giftcard} from '../../models/giftcard';//sali del directorio de create , sali del directorio de compomnentes y entras al de modelos
import{GiftcardService} from '../../services/giftcard.service';

import {get} from 'scriptjs';
import{Global} from '../../services/global';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import {Router } from '@angular/router';

@Component({
  selector: 'app-confirm-giftcard',
  templateUrl: './confirm-giftcard.component.html',
  styleUrls: ['./confirm-giftcard.component.css']
})
export class ConfirmGiftcardComponent implements OnInit {

  public giftcard: Giftcard;
  public statuss: string;
  public entendido: boolean;
  public save_project: any;
  public filesToUpload: Array<File>= new Array();
  public init_point: string;
  public urlTree: any;
  public confirmado:boolean;


  constructor(private _giftcardService: GiftcardService,  private http: HttpClient, private router: Router,) { 

        this.giftcard=new Giftcard('','',0,'','','','','',0,0,0,'','',0);
      this.statuss= "";
      this.init_point="";
      this.entendido=false;
      this.confirmado=false;

      this.urlTree = this.router.parseUrl(this.router.url);

        if(this.urlTree.queryParams['amount']){
        this.giftcard.amount = this.urlTree.queryParams['amount'];
        }else{
           if(localStorage.getItem("amount")){

             console.log(localStorage.getItem("amount"));

            console.log(typeof(JSON.parse(localStorage.getItem("amount") || '{}')));
              this.giftcard.amount = JSON.parse(localStorage.getItem("amount") || '{}');
            }


        }

        if(this.urlTree.queryParams['status']){
        this.giftcard.status = this.urlTree.queryParams['status'];
        }

        if(this.urlTree.queryParams['payment_id']){
        this.giftcard.payment_id = this.urlTree.queryParams['payment_id'];
        }

        if(this.urlTree.queryParams['payment_type']){
        this.giftcard.payment_type = this.urlTree.queryParams['payment_type'];
        }

        if(this.urlTree.queryParams['merchant_order_id']){
          this.giftcard.merchant_order_id = this.urlTree.queryParams['merchant_order_id'];
        }

   //recogemos la respuesta por parametros de la URLtree
  /* this.giftcard.status = this.urlTree.queryParams['status'];
   this.giftcard.payment_id = this.urlTree.queryParams['payment_id'];
   this.giftcard.payment_type = this.urlTree.queryParams['payment_type'];
   this.giftcard.merchant_order_id = this.urlTree.queryParams['merchant_order_id'];
*/
       if(localStorage.getItem("buyerName")){
              this.giftcard.buyerName=(localStorage.getItem("buyerName") || '{}');
              console.log(localStorage.getItem("buyerName"));
              console.log(this.giftcard.buyerName);


            }

            if(localStorage.getItem("issuedDate")){
              this.giftcard.issuedDate=(localStorage.getItem("issuedDate") || '{}');

            }

            if(localStorage.getItem("client")){
              this.giftcard.client=(localStorage.getItem("client") || '{}');

            }

            if(localStorage.getItem("emailClient")){
              this.giftcard.emailClient=(localStorage.getItem("emailClient") || '{}');

            }

            if(localStorage.getItem("buyerEmail")){
              this.giftcard.buyerEmail=(localStorage.getItem("buyerEmail") || '{}');

            }

            if(localStorage.getItem("dni")){
              this.giftcard.dni=JSON.parse(localStorage.getItem("dni") || '{}');
        console.log(typeof(JSON.parse(localStorage.getItem("dni") || '{}')));
            }

            if(localStorage.getItem("phoneClient")){
              this.giftcard.phoneClient=JSON.parse(localStorage.getItem("phoneClient") || '{}');

            }




  }

entendidoMet():void{

     this.entendido=true;

  
   }

   ngOnInit(): void {
 get("https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js", () => {
      //library has been loaded...
    });

 //window.alert("Realiza los pasos en orden y no interrumpas el proceso de compra. El navegador saldr?? a Mercado Pago y luego volver?? al sitio web para confirmar la compra. Se te notificar?? cuando puedas cerrar la ventana.");



   
  }

checkout(form:any){


    localStorage.setItem("buyerName",this.giftcard.buyerName);
    localStorage.setItem("amount", this.giftcard.amount.toString());
    localStorage.setItem("issuedDate",this.giftcard.issuedDate);


    this._giftcardService.buyGiftcard(this.giftcard).subscribe(
       
            response =>{
              
             
           console.log("Realizando petici??n a mercado y preparando checkout...");
          
           console.log(response.response.init_point);   
             /* CON LA RESPONSE QUE ME LLEGA DEL BACKEND  REDIRECCION AL USUARIO*/
              window.location.href = response.response.init_point;
          //this.init_point = result.data.result;
        
          
     //window.location.href = this.init_point;
                
                form.reset();
                
             
                        
            },
            error =>{console.log(<any> error+"ESTA TIRANDO ERROR NO SE PORQUE");}
        );


}


 confirmarPago(form: any){



    console.log("Esta es la giftcard del front End");
    console.log(this.giftcard);
    this._giftcardService.saveGiftcard(this.giftcard).subscribe(
   
        response =>{
       if(response){


       this.statuss= 'success'; 
     
       localStorage.removeItem('buyerName');
       localStorage.removeItem("issuedDate");
       localStorage.removeItem("client");
       localStorage.removeItem("emailClient");
       localStorage.removeItem("buyerEmail");
       localStorage.removeItem("dni");
       localStorage.removeItem("phoneClient");
       localStorage.removeItem("amount");
        form.reset();
         form.reset();
          form.reset();





       }   
       console.log(response);   
       console.log("Guardado la giftcard en la base de datos!");
      
           

                  // 
            
         
                    
        },
        error =>{console.log(<any> error+"ESTA TIRANDO ERROR NO SE PORQUE");}
    );






}

confirm():void{
this.confirmado=true;

}

resetForm(form1: any,form2:any):void{
  form1.reset();
  form2.reset();
}





}
