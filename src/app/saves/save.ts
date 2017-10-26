import { Gate } from "../gate/gate";
import { QBit, Spot, CBit, Measurement } from "../gate-canvas/canvas-classes"

export class Save {
    bits: QBit[];
    cbit: CBit;
    name: string;
    lastModified: Date;
    numQBits: number;
    numCBits: number;
    canvasLength: number;

    constructor(name: string, numQBits: number, numCBits: number, canvasLength: number){
        this.name = name;
        this.lastModified = new Date();
        this.bits = [];
        this.setupBits(numQBits, numCBits, canvasLength);    
    }

    public setupBits(numQBits: number, numCBits: number, canvasLength: number){
        this.numQBits = numQBits;
        this.numCBits = numCBits;
        this.canvasLength = canvasLength;
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

    public static serialize(save: Save): Save{
        let s = new Save(save.name,save.numQBits, save.numCBits, save.canvasLength);
        s.lastModified = save.lastModified;
        for(let bitIdx = 0; bitIdx < s.bits.length; bitIdx++){
            s.bits[bitIdx].mode = save.bits[bitIdx].mode;
            s.bits[bitIdx].random = save.bits[bitIdx].random;
            s.bits[bitIdx].parameters = []; 
            save.bits[bitIdx].parameters.forEach(parameter => {
                s.bits[bitIdx].parameters.push(parameter);
            });
            for(let spotIdx = 0; spotIdx < s.bits[bitIdx].spots.length; spotIdx++){
                let gate = save.bits[bitIdx].spots[spotIdx].gate;
                s.bits[bitIdx].spots[spotIdx].gate = Gate.serialize(gate);
            }
        }
        s.cbit = save.cbit;
        return s;
    }
  }


  