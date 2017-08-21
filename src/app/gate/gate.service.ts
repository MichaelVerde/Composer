import { Injectable } from '@angular/core';
import { Gate } from "./gate";

@Injectable()
export class GateService {
  gateTypes: Gate[] = [];
  operatorTypes: Gate[] = [];

  constructor() { 
    this.gateTypes.push(new Gate (1, "id", "", ""));
    this.gateTypes.push(new Gate (2, "X", "", ""));
    this.gateTypes.push(new Gate (3, "Y", "", ""));
    this.gateTypes.push(new Gate (4, "Z", "", ""));
    this.gateTypes.push(new Gate (5, "H", "", ""));
    this.gateTypes.push(new Gate (6, "S", "", ""));
    this.gateTypes.push(new Gate (7, "Sn", "", ""));
    this.gateTypes.push(new Gate (8, "T", "", ""));
    this.gateTypes.push(new Gate (9, "Tn", "", ""));
    this.gateTypes.push(new Gate (9, "+", "", ""));
    this.operatorTypes.push(new Gate (10, "M", "", "bottom"));
  }

}
