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

  @Output() onModalClose = new EventEmitter();  

  cbitList: number[] = [];

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
    this.cbitList = [];
    for(let i = 0; i < this.numCBits; i++){
      this.cbitList.push(i + 1);
    }
  }

  open() {
    if(this.onCanvas() && (this.gate.parameters.length > 0 || this.gate.isMeasurement)){
      this.gate.modalOpened = true;
      this.modalService.open(this.content).result.then((result) => {
        this.onModalClose.emit();
      }, (reason) => {
        this.onModalClose.emit();
      });;       
    }
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
    if(this.gate.connector === "both"){
      return "connector both";
    }
    else if(this.gate.connector === "bottom"){
      return "connector bottom";
    }
    else if(this.gate.connector === "top"){
      return "connector solid top";
    }
    else if(this.gate.typeId === 10){
      return "connector solid top";
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
    else if (this.gate.typeId === 10){
      classStr += "gate cz";
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
    if([0,10].indexOf(this.gate.typeId) === -1 && !this.gate.isMeasurement()){
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
