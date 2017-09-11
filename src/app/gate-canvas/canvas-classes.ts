import { Gate } from "../gate/gate"

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
  showBg: boolean = true; 
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

  