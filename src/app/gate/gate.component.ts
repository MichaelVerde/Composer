import { Component, OnInit, Input } from '@angular/core';
import { Gate } from './gate'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.css']
})
export class GateComponent implements OnInit {
  @Input() gate: Gate = new Gate();
  ready: boolean = false;

  constructor(public modalService: NgbModal) { }

  ngOnInit() {
    this.ready = true;
  }

  open(content) {
    this.modalService.open(content);
  }

  getConnectorClass():string{
    if(this.gate.connector === "both"){
      return "connector both";
    }
    else if(this.gate.connector === "bottom"){
      return "connector bottom";
    }
    else if(this.gate.connector === "top"){
      return "connector top";
    }
    else{
      return "";
    }
  }

  getGateClass():string{
    let classStr:string = "";
    if(this.gate.typeId === 0){
      classStr += "";
    }
    else if (this.gate.coupled < 0){
      classStr += "gate bottom";
    }
    else if (this.gate.coupled > 0){
      classStr += "gate top";
    }
    else {
      classStr += "gate";
    }

    if(this.gate.typeId >= 1 && this.gate.typeId <= 2){
      classStr += " turq-light";
    }
    else if(this.gate.typeId >= 3 && this.gate.typeId <= 9){
      classStr += " turq";
    }
    else if(this.gate.typeId >= 10 && this.gate.typeId <= 19){
      classStr += " yellow";
    }
    else if(this.gate.typeId >= 20 && this.gate.typeId <= 29){
      classStr += " pink";
    }
    return classStr;
  }

  getShowText():boolean{
    if(this.gate.typeId !== 0){
      return true;
    }
    else{
      return false;
    }
  }

}
