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

  getBackgroundClass():string{
    if(this.gate.bitIdx === -1 || this.gate.spotIdx === -1){
      return "gate-background";
    }
    else{
      return "placed-gate-background";
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
      return "connector top";
    }
    else{
      return "";
    }
  }

  getGateClass():string{
    if(this.gate.typeId === 0){
      return "";
    }
    else if (this.gate.coupled > 0){
      return "gate bottom";
    }
    else if (this.gate.coupled < 0){
      return "gate top";
    }
    else {
      return "gate";
    }
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
