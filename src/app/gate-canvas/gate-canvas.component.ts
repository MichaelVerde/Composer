import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Gate } from "../gate/gate"

@Component({
  selector: 'gate-canvas',
  templateUrl: './gate-canvas.component.html',
  styleUrls: ['./gate-canvas.component.css']
})
export class GateCanvasComponent implements OnChanges  {
  @Input() numQBits: number;
  @Input() numCBits: number;
  @Input() canvasLength: number = 40;
  showIdx: boolean = false;
  bits: QBit[] = [];
  cbit: CBit;

  constructor() { 
  }

  ngOnChanges() {
    this.setUpCanvas();
  }

  setUpCanvas(){ 
    //Set, Add or Subtract Qbits 
    if (this.numQBits > this.bits.length){
      for(let i = this.bits.length; i< this.numQBits ; i++){
        this.bits.push(new QBit(i, this.canvasLength));
      }
    }
    else if (this.numQBits < this.bits.length){
      for(let i = this.bits.length-1; i>= this.numQBits ; i--){
        this.bits.splice(i,1);
      }
    }

    //Set cbit if not there 
    if(!this.cbit){
      this.cbit = new CBit(this.canvasLength);
    }

    //Set, Add or Subtract spots from qbits 
    for(let i = 0; i< this.numQBits ; i++){
      if(this.canvasLength > this.bits[i].spots.length){
        for(let j = this.bits[i].spots.length; j< this.canvasLength ; j++){
          let spot = new Spot(i, j);
          this.bits[i].spots.push(spot);
        }
      }
      else if (this.canvasLength < this.bits[i].spots.length){
        for(let j = this.bits[i].spots.length - 1; j>= this.canvasLength ; j--){
          this.bits[i].spots.splice(j,1);
        }
      }
    }

    //Set, Add or Subtract spots from cbits 
    if(this.canvasLength > this.cbit.measurements.length){
      for(let j = this.cbit.measurements.length; j< this.canvasLength ; j++){
        let measurement = new Measurement(j);
        this.cbit.measurements.push(measurement);
      }
    }
    else if (this.canvasLength < this.cbit.measurements.length){
      for(let j = this.cbit.measurements.length - 1; j>= this.canvasLength ; j--){
        this.cbit.measurements.splice(j,1);
      }
    }


  }

  setNewGate($event: any, bitIdx: number, spotIdx: number) {
    let newGate:Gate = new Gate($event.dragData.typeId, 
      $event.dragData.typeName, 
      $event.dragData.description,
      $event.dragData.connector,
      $event.dragData.coupled);

    if(newGate){
      newGate.bitIdx = bitIdx;
      newGate.spotIdx = spotIdx;
      this.bits[bitIdx].spots[spotIdx].gate = newGate;

      if(newGate.isMeasurement){
        for(let i = bitIdx+1; i< this.bits.length; i++){
          this.bits[i].spots[spotIdx].gate = new Gate(0, "both");
        }
        this.cbit.measurements[spotIdx].active = true;
      }

    }
  }

  setNoGate($event: any, bitIdx: number, spotIdx: number) {

    if(this.bits[bitIdx].spots[spotIdx].gate.isMeasurement){
      for(let i = bitIdx+1; i< this.bits.length; i++){
        this.bits[i].spots[spotIdx].gate = new Gate();
        this.bits[i].spots[spotIdx].gate.bitIdx = i;
        this.bits[i].spots[spotIdx].gate.spotIdx = spotIdx;
      }
      this.cbit.measurements[spotIdx].active = false;
    }

    this.bits[bitIdx].spots[spotIdx].gate = new Gate();
    this.bits[bitIdx].spots[spotIdx].gate.bitIdx = bitIdx;
    this.bits[bitIdx].spots[spotIdx].gate.spotIdx = spotIdx;
  }

  allowDropFunction(bitIdx: number, spotIdx: number): any {
    return (dragData: any) => this.bits[bitIdx].spots[spotIdx].gate.typeId === 0 
    && this.bits[bitIdx].spots[spotIdx].gate.connector === ""
    && ((!dragData.isMeasurement && this.spotLessThanMeasureGate(bitIdx, spotIdx)) 
      ||(dragData.isMeasurement && (!this.bitHasMeasureGate(bitIdx) || dragData.bitIdx === bitIdx))); 
  }

  bitHasMeasureGate(bitIdx: number){
    for(let i = 0; i < this.bits[bitIdx].spots.length; i++){
      if(this.bits[bitIdx].spots[i].gate.isMeasurement){
        return true;
      }
    }
    return false;
  }

  spotLessThanMeasureGate(bitIdx: number, spotIdx: number){
    for(let i = 0; i <= spotIdx; i++){
      if(this.bits[bitIdx].spots[i].gate.isMeasurement){
        return false;
      }
    }
    return true;
  }
}

export class QBit {
  spots: Spot[] = [];
  constructor(idx:number, length: number) { 
    for(let i = 0; i< length ; i++){
      let spot = new Spot(idx, i);
      this.spots.push(spot);
    }
  }
}

export class Spot {
  bitIdx: number;
  spotIdx: number;  
  gate: Gate = new Gate();
  constructor(bitIdx: number, spotIdx: number) { 
    this.bitIdx = bitIdx;
    this.spotIdx = spotIdx;
    this.gate.bitIdx = bitIdx;
    this.gate.spotIdx = spotIdx;
  }
}

export class CBit {
  measurements: Measurement[] = [];
  constructor(length: number) { 
    for(let i = 0; i< length ; i++){
      let measurement = new Measurement(i);
      this.measurements.push(measurement);
    }
  }
}

export class Measurement {
  measurmentIdx: number;  
  active:boolean;
  value:number;
  constructor(measurmentIdx: number) { 
    this.measurmentIdx = measurmentIdx;
    this.active = false;
    this.value = 0;
  }
}

