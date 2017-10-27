import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QBit } from "../gate-canvas/canvas-classes";
import { SavesService } from '../saves/saves.service';
import { GateService } from '../gate/gate.service';

@Component({
  selector: 'qbit',
  templateUrl: './qbit.component.html',
  styleUrls: ['./qbit.component.css']
})
export class QbitComponent implements OnInit {
  @Input() qbit: QBit;

  constructor(public gateService: GateService, public savesService: SavesService) { }

  ngOnInit() {}

  open(){
    this.gateService.changeSideBarBit(this.qbit);
  }

  isSelected(){
    if(this.qbit === this.gateService.selected.bit){
      return "selected";
    }
    else{
      return "";
    }
  }

  getKet(){
    if(this.qbit.mode === 5){
      return "cat";
    }
    else if(this.qbit.mode === 3){
      return this.qbit.parameters[0].n;
    }
    else if(this.qbit.parameters.length > 0){
      let ketStr = "";
      for(let i = 0; i< this.qbit.parameters.length; i++){
        ketStr += this.qbit.parameters[i].name;
        if(i !== this.qbit.parameters.length -1) ketStr += ", ";
      }
      return ketStr;
    }
    else{
      return "0";
    }
  }

  getKetSate(){
    if(this.qbit.mode === 5){
      return this.qbit.parameters[0].even ? "e" : "o";
    }
    else{
      return "";
    }
  }

}
