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
  couple:Gate;
  private gridWidth = 4;
  @Output() draggingData= new EventEmitter(); 

  constructor(public gateService: GateService) { 
    this.couple = new Gate(19, "Couple");
    this.couple.connector = "bottom";
    this.setUpGrid();
  }

  ngOnInit() {
  }

  private setUpGrid(){
    this.gateService.setUpGateTypes();
    this.singleGrid = [];
    let row = [];
    for(let i = 0; i< this.gateService.singleGateTypes.length; i++){
      row.push(this.gateService.singleGateTypes[i]);
      if(i%this.gridWidth === this.gridWidth - 1 || i === this.gateService.singleGateTypes.length -1){
        this.singleGrid.push(row);
        row = [];
      }
    }

    this.coupledGrid = [];
    row = [];
    for(let i = 0; i< this.gateService.coupledGateTypes.length; i++){
      row.push(this.gateService.coupledGateTypes[i]);
      if(i%this.gridWidth === this.gridWidth - 1 || i === this.gateService.coupledGateTypes.length -1){
        this.coupledGrid.push(row);
        row = [];
      }
    }

    this.measurementsGrid = [];
    row = [];
    for(let i = 0; i< this.gateService.measurements.length; i++){
      row.push(this.gateService.measurements[i]);
      if(i%this.gridWidth === this.gridWidth - 1 || i === this.gateService.measurements.length -1){
        this.measurementsGrid.push(row);
        row = [];
      }
    }
  }

  setDragging($event: any, gate: Gate){
    this.draggingData.emit(gate);
  }

  setNotDragging($event: any){
    this.draggingData.emit(null);
    this.setUpGrid();
  }
}
