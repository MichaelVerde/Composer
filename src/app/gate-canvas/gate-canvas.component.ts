import { Component, OnInit, Input } from '@angular/core';
import { Gate } from "../gate/gate"

@Component({
  selector: 'gate-canvas',
  templateUrl: './gate-canvas.component.html',
  styleUrls: ['./gate-canvas.component.css']
})
export class GateCanvasComponent implements OnInit {
  @Input() numBits: number;
  canvasLength: number = 80;
  bits: QBit[] = [];

  constructor() { 
  }

  ngOnInit() {
    for(let i = 0; i< this.numBits ; i++){
      this.bits.push(new QBit(i, this.canvasLength));
    }
  }

  setNewGate($event: any, bitIdx: number, spotIdx: number) {
    let newGate:Gate = $event.dragData;
    if(newGate){
      this.bits[bitIdx].spots[spotIdx].gate = newGate;
    }
  }

  setNoGate($event: any, bitIdx: number, spotIdx: number) {
      this.bits[bitIdx].spots[spotIdx].gate = new Gate();
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
  }
}
