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
    if(this.gate.typeId === 3){
      return "connector both";
    }
    else if(this.gate.typeId === 4){
      return "connector bottom";
    }
    else if(this.gate.typeId === 5){
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
