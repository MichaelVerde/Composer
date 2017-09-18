import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Gate, GateParameter, GateParameterItem } from './gate'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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

  @Output() onModalClose = new EventEmitter();  

  cbitList: number[] = [];
  allowedCouples: number[] = [];

  constructor(public modalService: NgbModal) { }

  ngOnChanges(changes: SimpleChanges) { 
    if(changes.gate !== undefined 
      && changes.gate.previousValue !== undefined 
      && changes.gate.previousValue.typeId !== changes.gate.currentValue.typeId 
      && !this.gate.modalOpened){
        setTimeout(()=> {
          this.open();
        }, 0);
    }

    //set up options for measurement
    this.cbitList = [];
    for(let i = 0; i < this.numCBits; i++){
      this.cbitList.push(i);
    }

    //set up options for coupling
    if(this.gate.coupled){
      this.allowedCouples = [];
      for(let i =0; i< this.numQBits; i++){
        if(i != this.gate.bitIdx){
          this.allowedCouples.push(i);
        }
      }
      if(this.allowedCouples.indexOf(this.gate.couplingIdx) === -1){
        if(this.gate.bitIdx === 0){
          this.gate.couplingIdx = this.gate.bitIdx + 1;
        }
        else{
          this.gate.couplingIdx = this.gate.bitIdx - 1;
        }
      }
    }
  }

  open() {
    if(this.onCanvas() && (this.gate.parameters.length > 0 || this.gate.isMeasurement) && !this.gate.isCouple()){
      this.gate.modalOpened = true;
      this.modalService.open(this.content).result.then((result) => {
        this.onModalClose.emit();
      }, (reason) => {
        this.onModalClose.emit();
      });;       
    }
  }

  couplingChanged($event: any){
    this.onModalClose.emit();
  }

  onCanvas():boolean{
    return (this.gate.bitIdx >=0  && this.gate.spotIdx >= 0 && this.gate.typeId !== 0);
  }

  measurementIntChange($event: any){
    this.gate.measurementType = 4;
  }

  toggleLink(parameter: GateParameterItem){
    if(parameter.linkMode){
      parameter.value = 0;
      parameter.link = null;
      parameter.linkMode = false;
    }
    else{
      parameter.value = null;
      parameter.link = 1;
      parameter.linkMode = true;
    }
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
    else if (this.gate.double){
      classStr += "gate double";
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
    if([0,10,19].indexOf(this.gate.typeId) === -1 && !this.gate.isMeasurement()){
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
