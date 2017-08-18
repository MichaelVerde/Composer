import { Component, OnInit } from '@angular/core';
import { GateService } from "../gate/gate.service";
import { Gate } from "../gate/gate";

@Component({
  selector: 'gate-toolbox',
  templateUrl: './gate-toolbox.component.html',
  styleUrls: ['./gate-toolbox.component.css']
})
export class GateToolboxComponent implements OnInit {
  grid: Gate[][] = [];
  private gridWidth = 3; 

  constructor(public gateService: GateService) { 
    this.setUpGrid();
  }

  ngOnInit() {
  }

  private setUpGrid(){
    let j = 0;
    let row = [];
    for(let i = 0; i< this.gateService.gateTypes.length; i++){
      row.push(this.gateService.gateTypes[i]);
      if(i%this.gridWidth === this.gridWidth - 1){
        this.grid.push(row);
        row = [];
      }
    }
  }

}
