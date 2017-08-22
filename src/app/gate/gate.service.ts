import { Injectable } from '@angular/core';
import { Gate } from "./gate";

@Injectable()
export class GateService {
  singleGateTypes: Gate[] = [];
  coupledGateTypes: Gate[] = [];
  measurements: Gate[] = [];

  constructor() { 
    this.singleGateTypes.push(new Gate (1, "S", ""));
    this.singleGateTypes.push(new Gate (2, "D", ""));
    this.singleGateTypes.push(new Gate (3, "X", ""));
    this.singleGateTypes.push(new Gate (4, "Z", ""));
    this.singleGateTypes.push(new Gate (5, "P", ""));
    this.singleGateTypes.push(new Gate (6, "F", ""));
    this.singleGateTypes.push(new Gate (7, "\u03A6", ""));

    this.coupledGateTypes.push(new Gate (10, "\u03A6c", "", "", -1));
    this.coupledGateTypes.push(new Gate (11, "B", "", "", -1));
    this.coupledGateTypes.push(new Gate (12, "S", "", "", -1));

    this.measurements.push(new Gate (20, "M", "", "bottom"));
  }

}
