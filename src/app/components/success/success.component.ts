import { Component, OnInit } from '@angular/core';
import {Giftcard} from '../../models/giftcard';
import {Report} from '../../models/report';
import{GiftcardService} from '../../services/giftcard.service';

import {Router } from '@angular/router';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {


  private giftcard : Giftcard;
  public report: Report;


  constructor(private _giftcardService: GiftcardService,  private router: Router) { 

this.giftcard= new Giftcard('','',0,'','','','','',0,0,0,'','',0);
   this.report= new Report('','','','',0);


  }

  ngOnInit(): void {
  }

reportarProblema(form:any) {

  
console.log("Aquí se enviará");
console.log(this.report);

this._giftcardService.saveReport(this.report).subscribe(

response=>{

  if(response){

    console.log("El siguiente reporte ha sido enviado.");
    form.reset();

  }
},


error =>{

console.log(<any>error+"No hay respuesta del backend" )

},


  )




}
  

}
