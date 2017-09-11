import { Gate } from "../gate/gate";
import { QBit, Spot, CBit, Measurement } from "../gate-canvas/canvas-classes"

export class Save {
    bits: QBit[];
    name: string;
    lastModified: Date;

    constructor(name: string){
        this.name = name;
        this.bits = [];
        this.lastModified = new Date();
    }
  }


  