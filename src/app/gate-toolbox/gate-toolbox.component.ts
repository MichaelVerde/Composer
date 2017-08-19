import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GateService } from "../gate/gate.service";
import { Gate } from "../gate/gate";

@Component({
  selector: 'gate-toolbox',
  templateUrl: './gate-toolbox.component.html',
  styleUrls: ['./gate-toolbox.component.css']
})
export class GateToolboxComponent implements OnInit {
  gatesGrid: Gate[][] = [];
  operatorsGrid: Gate[][] = [];
  private gridWidth = 4;
  @Output() dragStart= new EventEmitter();; 

  constructor(public gateService: GateService) { 
    this.setUpGrid();
  }

  ngOnInit() {
  }

  private setUpGrid(){
    let row = [];
    for(let i = 0; i< this.gateService.gateTypes.length; i++){
      row.push(this.gateService.gateTypes[i]);
      if(i%this.gridWidth === this.gridWidth - 1 || i === this.gateService.gateTypes.length -1){
        this.gatesGrid.push(row);
        row = [];
      }
    }

    row = [];
    for(let i = 0; i< this.gateService.operatorTypes.length; i++){
      row.push(this.gateService.operatorTypes[i]);
      if(i%this.gridWidth === this.gridWidth - 1 || i === this.gateService.operatorTypes.length -1){
        this.operatorsGrid.push(row);
        row = [];
      }
    }
  }

  setDragging($event: any){
    this.dragStart.emit(true);
  }

  setNotDragging($event: any){
    this.dragStart.emit(false);
  }
}
