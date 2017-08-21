import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GateService } from "../gate/gate.service";
import { Gate } from "../gate/gate";

@Component({
  selector: 'gate-toolbox',
  templateUrl: './gate-toolbox.component.html',
  styleUrls: ['./gate-toolbox.component.css']
})
export class GateToolboxComponent implements OnInit {
  singleGrid: Gate[][] = [];
  coupledGrid: Gate[][] = [];
  measurementsGrid: Gate[][] = [];
  private gridWidth = 4;
  @Output() dragStart= new EventEmitter(); 

  constructor(public gateService: GateService) { 
    this.setUpGrid();
  }

  ngOnInit() {
  }

  private setUpGrid(){
    let row = [];
    for(let i = 0; i< this.gateService.singleGateTypes.length; i++){
      row.push(this.gateService.singleGateTypes[i]);
      if(i%this.gridWidth === this.gridWidth - 1 || i === this.gateService.singleGateTypes.length -1){
        this.singleGrid.push(row);
        row = [];
      }
    }

    row = [];
    for(let i = 0; i< this.gateService.coupledGateTypes.length; i++){
      row.push(this.gateService.coupledGateTypes[i]);
      if(i%this.gridWidth === this.gridWidth - 1 || i === this.gateService.coupledGateTypes.length -1){
        this.coupledGrid.push(row);
        row = [];
      }
    }

    row = [];
    for(let i = 0; i< this.gateService.measurements.length; i++){
      row.push(this.gateService.measurements[i]);
      if(i%this.gridWidth === this.gridWidth - 1 || i === this.gateService.measurements.length -1){
        this.measurementsGrid.push(row);
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
