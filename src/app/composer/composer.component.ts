import { Component, OnInit } from '@angular/core';
import { Gate, GateParameter, GateParameterItem } from "../gate/gate";
import { QBit } from "../gate-canvas/canvas-classes";
import { SavesService } from '../saves/saves.service';
import { GateService } from '../gate/gate.service';

@Component({
  selector: 'composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css']
})
export class ComposerComponent implements OnInit {
  dragData?: Gate = null;
  numQBits: number = 5;
  numCBits: number = 5;
  canvasLength: number = 40;

  sidebarOpen: boolean = false;
  sidebarType: string;
  sidebarGate: Gate;
  sidebarBit: QBit;
  allowedCouples: number[];
  cbitList: number[] = [];
  cbitList2: number[] = [];

  constructor(public savesService: SavesService, public gateService: GateService) { 
  }

  ngOnInit() {
    this.savesService.numQBits = this.numQBits;
    this.savesService.numCBits = this.numCBits;
    this.savesService.canvasLength = this.canvasLength;

    //listen for sidebar gate change
    this.gateService.sideBarGateChange.subscribe((value) => { 
      this.sidebarGate = value;
      this.sidebarOpen = true;
      this.sidebarType = "gate";
      this.calcOptions();
    });

    //listen for sidebar bit change
    this.gateService.sideBarBitChange.subscribe((value) => { 
      this.sidebarBit = value;
      this.sidebarOpen = true;
      this.sidebarType = "bit";

      if(!this.sidebarBit.parameters){
        this.setParameters();
      }
    });

    this.savesService.currentSaveChange.subscribe((value) => { 
      this.numQBits = this.savesService.saves[value].numQBits; 
      this.numCBits = this.savesService.saves[value].numCBits; 
      this.canvasLength = this.savesService.saves[value].canvasLength; 
    });
  }

  calcOptions(){
    //set up options for measurement
    this.cbitList = [];
    this.cbitList2 = [];
    for(let i = 0; i < this.numCBits; i++){
      if(this.sidebarGate.measurementBit2 !== i){
        this.cbitList.push(i);
      }
      if(this.sidebarGate.measurementBit !== i){
        this.cbitList2.push(i);
      }
    }
    this.allowedCouples = this.savesService.getAllowedCouples(this.sidebarGate);
  }

  canvasRefresh(){
    this.savesService.refreshSave();
  }

  canvasSave(){
    this.savesService.saveChanged();
    this.canvasRefresh();
  }

  measurementTypeToggled(){
    if(this.sidebarGate.measurementType === 2){
      this.sidebarGate.measurementBit = 0;
      this.sidebarGate.measurementBit2 = 1;
    }
    else{
      this.sidebarGate.measurementBit = 0;
      this.sidebarGate.measurementBit2 = null;
    }
    this.calcOptions();
    this.canvasSave();
  }

  measurementBitToggled(){
    this.calcOptions();
    this.canvasRefresh();
  }

  setDragging(gate?: Gate){
    this.dragData = gate;
  }

  updateSettings(){
    this.savesService.numQBits = this.numQBits;
    this.savesService.numCBits = this.numCBits;
    this.savesService.canvasLength = this.canvasLength;
    this.canvasRefresh(); 
  }

  //General Sidebar Functions
  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(){
    this.sidebarOpen = false;
  }

  //Gate Sidebar
  toggleLink(parameter: GateParameterItem){
    if(parameter.linkMode){
      parameter.value = 0;
      parameter.link = null;
      parameter.linkMode = false;
    }
    else{
      parameter.value = null;
      parameter.link = 0;
      parameter.linkMode = true;
    }
    this.savesService.refreshSave();
  }

  togglePhase(parameter: GateParameter){
    if(parameter.phaseMode){
      parameter.phaseMode = false;
      parameter.r = undefined;
      parameter.phi = undefined;
      parameter.a = new GateParameterItem(0,null);
      parameter.b = new GateParameterItem(0,null);
    }
    else{
      parameter.phaseMode = true;
      parameter.a = undefined;
      parameter.b = undefined;
      parameter.r = new GateParameterItem(0,null);
      parameter.phi = new GateParameterItem(0,null);
    }
  }

  //Bit sidebar
  toggleBitPhase(idx: number){
    this.sidebarBit.parameters[idx].phaseMode = !this.sidebarBit.parameters[idx].phaseMode;
    this.savesService.saveChanged();
  }

  setParameters(parameters?: any[]){
    this.sidebarBit.parameters = [];
    if(this.sidebarBit.mode == 5){
      this.sidebarBit.parameters.push({
        'name': 'Parity',
        'even': true
      });
    }
    if(this.sidebarBit.mode === 1 ||  this.sidebarBit.mode === 4 ||  this.sidebarBit.mode === 5){
      this.sidebarBit.parameters.push({
        'name': 'α',
        'a': 0,
        'b': 0,
        'r': 0,
        'phi': 0,
        'phaseMode': false
      });
    }
    if(this.sidebarBit.mode === 2 || this.sidebarBit.mode === 4){
      this.sidebarBit.parameters.push({
        'name': 'ξ',
        'a': 0,
        'b': 0,
        'r': 0,
        'phi': 0,
        'phaseMode': true
      });
    }
    if(this.sidebarBit.mode === 3){
      this.sidebarBit.parameters.push({
        'name': 'n',
        'n': 0
      });
    }
    this.savesService.saveChanged();
  }

}
