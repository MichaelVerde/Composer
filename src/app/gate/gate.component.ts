import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Gate, GateParameter, GateParameterItem } from './gate'
import { GateService } from './gate.service'

@Component({
  selector: 'gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.css']
})
export class GateComponent implements OnChanges {
  @Input() gate: Gate = new Gate();
  @ViewChild('content') public content;
  @Input() numCBits: number;
  @Input() numQBits: number;

  constructor(public gateService: GateService) { }

  ngOnChanges(changes: SimpleChanges) { 
    setTimeout(()=> {
      this.open();
    }, 0);
  }

  open() {
    if(this.onCanvas() && (this.gate.parameters.length > 0 || this.gate.isMeasurement) && !this.gate.isCouple()){
      this.gate.modalOpened = true;
      this.gateService.changeSideBarGate(this.gate);     
    }
  }

  onCanvas():boolean{
    return (this.gate.bitIdx >=0  && this.gate.spotIdx >= 0 && this.gate.typeId !== 0);
  }

  getConnectorClass():string{
    let str = "";
    if(this.gate.connector === "both"){
      str += "connector both solid";
    }
    else if(this.gate.connector === "bottom"){
      str += "connector bottom solid";
    }
    else if(this.gate.connector === "top"){
      str += "connector top solid";
    }

    if(this.gate.line === "both"){
      str += "connector both ";
    }
    else if(this.gate.line === "bottom"){
      str += "connector bottom ";
    }
    else if(this.gate.line === "top"){
      str += "connector top";
    }
    return str;
  }

  getGateClass():string{
    let classStr:string = "";
    if(this.gate.typeId === 0){
      classStr += "";
    }
    else if (this.gate.typeId === 10){
      classStr += "gate couple";
    }
    else if (this.gate.typeId === 19){
      classStr += "gate couple clear";
    }
    else if (this.gate.typeId === 18){
      classStr += "gate";
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
    if([0,10,18,19].indexOf(this.gate.typeId) === -1 && !this.gate.isMeasurement()){
      return true;
    }
    else{
      return false;
    }
  }

  getShowIcon():boolean{
    if(this.gate.typeId !== 0 && this.gate.isMeasurement()){
      return true;
    }
    else{
      return false;
    }
  }
}
