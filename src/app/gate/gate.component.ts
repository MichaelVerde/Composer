import { Component, OnInit, Input } from '@angular/core';
import { Gate } from './gate'

@Component({
  selector: 'gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.css']
})
export class GateComponent implements OnInit {
  @Input() gate: Gate = new Gate();
  ready: boolean = false;

  constructor() { }

  ngOnInit() {
    this.ready = true;
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
    if(this.gate.typeId !== 0){
      return "gate";
    }
    else{
      return "";
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
