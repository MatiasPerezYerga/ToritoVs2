import { Component, OnInit } from '@angular/core';
import {Report} from '../../models/report';
import{GiftcardService} from '../../services/giftcard.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  public report: Report;
  constructor(private _giftcardService: GiftcardService,) {


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
