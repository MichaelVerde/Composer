import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Gate } from "../gate/gate";
import { QBit, Spot, CBit, Measurement } from "./canvas-classes";
import { SavesService } from '../saves/saves.service';

@Component({
  selector: 'gate-canvas',
  templateUrl: './gate-canvas.component.html',
  styleUrls: ['./gate-canvas.component.css']
})
export class GateCanvasComponent implements OnChanges  {
  @Input() dragData?: Gate;
  @Output() draggingData= new EventEmitter(); 

  showIdx: boolean = false;
  bits: QBit[] = [];
  cbit: CBit;
  numCBits: number;
  numQBits: number;
  canvasLength: number;

  constructor(public savesService: SavesService) { 
  }

  ngOnChanges() {
    this.setUpCanvas();
  }

  setUpCanvas(){ 
    this.savesService.currentSaveChange.subscribe((value) => { 
      this.bits = this.savesService.saves[value].bits; 
      this.cbit = this.savesService.saves[value].cbit; 
      this.numCBits = this.savesService.saves[value].numCBits; 
      this.numQBits = this.savesService.saves[value].numQBits; 
      this.canvasLength = this.savesService.saves[value].canvasLength; 
    });
    if(this.savesService.saves.length === 0){
      this.savesService.newSave("temp");
    }
    this.recalcAllGateIdx();
  }

  setNewGate($event: any, bitIdx: number, spotIdx: number) {
    let newGate:Gate = $event.dragData;
    if(newGate){
      this.bits[bitIdx].spots[spotIdx].gate = newGate;
    }
    this.recalcAllGateIdx();
  }

  setNoGate($event: any, bitIdx: number, spotIdx: number) {
    this.bits[bitIdx].spots[spotIdx].gate = new Gate();
    this.recalcAllGateIdx();
  }

  setMeasurementConnectors(){
    for(let bitIdx = 0; bitIdx< this.bits.length; bitIdx++){
      for(let spotIdx = 0; spotIdx< this.bits[bitIdx].spots.length; spotIdx++){
        if(this.bits[bitIdx].spots[spotIdx].gate.isMeasurement()
        || this.bits[bitIdx].spots[spotIdx].gate.isLinked()){
          for(let i = bitIdx+1; i< this.bits.length; i++){
            this.bits[i].spots[spotIdx].gate = new Gate();
            this.bits[i].spots[spotIdx].gate.bitIdx = i;
            this.bits[i].spots[spotIdx].gate.spotIdx = spotIdx;
            this.bits[i].spots[spotIdx].gate.line = "both";
          }
          if(this.bits[bitIdx].spots[spotIdx].gate.isMeasurement()){
            this.cbit.measurements[spotIdx].active = true;
          }
          else if(this.bits[bitIdx].spots[spotIdx].gate.isLinked()){
            this.cbit.measurements[spotIdx].linked = true;
          }
        }
        if(!this.spotLessThanMeasureGate(bitIdx, spotIdx)){
          this.bits[bitIdx].spots[spotIdx].showBg = false;
        }
        else{
          this.bits[bitIdx].spots[spotIdx].showBg = true;
        }
      }
    }
  }

  setCoupledConnectors(){
    for(let bitIdx = 0; bitIdx< this.bits.length; bitIdx++){
      for(let spotIdx = 0; spotIdx< this.bits[bitIdx].spots.length; spotIdx++){
        let gate:Gate = this.bits[bitIdx].spots[spotIdx].gate;
        if(gate.coupled && gate.couplingIdx > gate.bitIdx){
          for(let i = gate.bitIdx; i<= gate.couplingIdx; i++){
            if(i=== gate.bitIdx){
              this.bits[i].spots[spotIdx].gate.connector = "bottom";
            }
            else if (i === gate.couplingIdx){
              this.bits[i].spots[spotIdx].gate = new Gate(19, "Couple");
              this.bits[i].spots[spotIdx].gate.bitIdx = gate.couplingIdx;
              this.bits[i].spots[spotIdx].gate.spotIdx = spotIdx;
              this.bits[i].spots[spotIdx].gate.connector = "top";
            }
            else{
              this.bits[i].spots[spotIdx].gate = new Gate();
              this.bits[i].spots[spotIdx].gate.connector = "both";
            }
          }
        }
        else if(gate.coupled && gate.couplingIdx < gate.bitIdx){
          for(let i = gate.couplingIdx; i<= gate.bitIdx; i++){
            if(i=== gate.bitIdx){
              this.bits[i].spots[spotIdx].gate.connector = "top";
            }
            else if (i === gate.couplingIdx){
              this.bits[i].spots[spotIdx].gate = new Gate(19, "Couple");
              this.bits[i].spots[spotIdx].gate.bitIdx = gate.couplingIdx;
              this.bits[i].spots[spotIdx].gate.spotIdx = spotIdx;
              this.bits[i].spots[spotIdx].gate.connector = "bottom";
            }
            else{
              this.bits[i].spots[spotIdx].gate = new Gate();
              this.bits[i].spots[spotIdx].gate.connector = "both";
            }
          }
        }
      }
    }
  }

  allowDragFunction(bitIdx: number, spotIdx: number): any {
    return !this.bits[bitIdx].spots[spotIdx].gate.isCouple();
  }

  allowDropFunction(bitIdx: number, spotIdx: number): any {
    return (dragData: any) => 
    this.bits[bitIdx].spots[spotIdx].gate.typeId === 0 
    && this.bits[bitIdx].spots[spotIdx].gate.connector === ""
    && ((!dragData.isMeasurement() && this.spotLessThanMeasureGate(bitIdx, spotIdx)) 
      ||(dragData.isMeasurement() && !this.bitHasMeasureGate(bitIdx) && !this.spotHasLowerGate(bitIdx, spotIdx) && this.spotIsLastGate(bitIdx, spotIdx)))
    && (!dragData.double || bitIdx !== 0); 
  }

  bitHasMeasureGate(bitIdx: number){
    for(let i = 0; i < this.bits[bitIdx].spots.length; i++){
      if(this.bits[bitIdx].spots[i].gate.isMeasurement()){
        return true;
      }
    }
    return false;
  }

  spotHasLowerGate(bitIdx: number, spotIdx: number){
    for(let i = bitIdx; i < this.bits.length; i++){
      if(this.bits[i].spots[spotIdx].gate.typeId !== 0){
        return true;
      }
    }
    return false;
  }

  spotLessThanMeasureGate(bitIdx: number, spotIdx: number){
    for(let i = 0; i <= spotIdx; i++){
      if(this.bits[bitIdx].spots[i].gate.isMeasurement()){
        return false;
      }
    }
    return true;
  }

  spotIsLastGate(bitIdx: number, spotIdx: number){
    for(let i = spotIdx; i < this.bits[bitIdx].spots.length; i++){
      if(this.bits[bitIdx].spots[i].gate.typeId !== 0){
        return false;
      }
    }
    return true;
  }

  recalcAllGateIdx(){
    for(let bitIdx = 0; bitIdx< this.bits.length; bitIdx++){
      for(let spotIdx = 0; spotIdx< this.bits[bitIdx].spots.length; spotIdx++){
        if(this.bits[bitIdx].spots[spotIdx].gate.double && bitIdx === 0){
          this.bits[bitIdx].spots[spotIdx].gate = new Gate(); 
        }
        if(this.bits[bitIdx].spots[spotIdx].gate.typeId === 19){
          this.bits[bitIdx].spots[spotIdx].gate = new Gate(); 
        }

        this.bits[bitIdx].spots[spotIdx].bitIdx = bitIdx;
        this.bits[bitIdx].spots[spotIdx].spotIdx = spotIdx;
        this.bits[bitIdx].spots[spotIdx].gate.bitIdx = bitIdx;
        this.bits[bitIdx].spots[spotIdx].gate.spotIdx = spotIdx;
        this.bits[bitIdx].spots[spotIdx].gate.connector = "";

        if(bitIdx === 0){
          this.cbit.measurements[spotIdx].active = false;
          this.cbit.measurements[spotIdx].linked = false;
        }
      }
    }
    this.setMeasurementConnectors();
    this.setCoupledConnectors();
    this.save();
  }

  getDraggingClass(bitIdx: number, spotIdx: number){
    if(this.dragData && this.allowDropFunction(bitIdx,spotIdx)(this.dragData)){
      return "circle"
    }
    else {
      return "";
    }
  }

  setDragging($event: any, gate: Gate){
    this.draggingData.emit(gate);
  }

  setNotDragging($event: any){
    this.draggingData.emit(null);
  }

  save(){
    this.savesService.saves[this.savesService.currentSave].bits = this.bits;
    this.savesService.saves[this.savesService.currentSave].lastModified = new Date();
  }
}

