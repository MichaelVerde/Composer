import { Component, OnChanges, Input, ViewChild } from '@angular/core';
import { Gate } from './gate'
import { GateService } from "../gate/gate.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.css']
})
export class GateComponent implements OnChanges {
  @Input() gate: Gate = new Gate();
  @ViewChild('content') public content;
  modalOpen: boolean;

  constructor(public modalService: NgbModal, public gateService: GateService) { }

  ngOnChanges() {  
    this.open();
  }

  open() {
    if(this.onCanvas() && (this.showParameter() || this.showPhase() || this.showTrans() || this.showMeasurement()) ){
      this.modalService.open(this.content);
    }
  }

  onCanvas():boolean{
    return (this.gate.bitIdx >=0  && this.gate.spotIdx >= 0 && this.gate.typeId !== 0);
  }

  showParameter():boolean{
    return this.gate.typeId === 1 
    || this.gate.typeId === 2 
    || this.gate.typeId === 3 
    || this.gate.typeId === 4 
    || this.gate.typeId === 5 
    || this.gate.typeId === 12; 
  }

  showCplx():boolean{
    return this.showParameter() && 
    (this.gate.typeId === 1 
    || this.gate.typeId === 2 
    || this.gate.typeId === 12); 
  }

  showPhase():boolean{
    return this.gate.typeId === 7
    || this.gate.typeId === 10 
    || this.gate.typeId === 11
    || this.gate.typeId === 12;
  }

  showTrans():boolean{
    return this.gate.typeId === 11 
    || this.gate.typeId === 12;
  }

  showMeasurement():boolean{
    return this.gate.typeId === 20;
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
