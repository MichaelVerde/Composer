import { Injectable } from '@angular/core';
import { Save } from './save'
import { Gate } from '../gate/gate'
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SavesService {
  public numQBits: number = 5;
  public numCBits: number = 5;
  public canvasLength: number = 20;
  public saves: Save[];
  public currentSave: number;  
  savesChange: Subject<number> = new Subject<number>();
  currentSaveChange: Subject<number> = new Subject<number>();
  onSaveChange: Subject<number> = new Subject<number>();

  constructor(public http: Http) {}

  getSaves(){
    this.saves = [];
    if(localStorage['saves'] !== undefined){
      try{
        JSON.parse(localStorage['saves']).forEach(save =>{
          this.saves.push(Save.serialize(save));
        });
        this.selectSave(this.saves.length-1);
      }
      catch (error){
        delete localStorage['saves'];
      }
    }
    if(this.saves.length === 0){
      this.getPresets().subscribe(presets => {
        presets.forEach(save =>{
          this.saves.push(Save.serialize(save));
        });
        this.newSave("New");
      }, error => console.log(error));
    }
  }

  getAllowedCouples(gate: Gate): number[]{
    let allowedCouples = [];
    if(this.saves[this.currentSave]){
      for(let i =gate.bitIdx -1; i>= 0; i--){
        let coupleSpot = this.saves[this.currentSave].bits[i].spots[gate.spotIdx];
        if(i === gate.couplingIdx 
          || (i != gate.bitIdx 
          && coupleSpot
          && coupleSpot.showBg
          && coupleSpot.gate
          && coupleSpot.gate.typeId === 0
          && coupleSpot.gate.connector === "")){
          allowedCouples.push(i);
        }
        else if(coupleSpot && coupleSpot.showBg){
          break;
        }
      }
      for(let i =gate.bitIdx +1; i< this.saves[this.currentSave].numQBits; i++){
        let coupleSpot = this.saves[this.currentSave].bits[i].spots[gate.spotIdx];
        if(i === gate.couplingIdx 
          || (i != gate.bitIdx 
          && coupleSpot
          && coupleSpot.showBg
          && coupleSpot.gate
          && coupleSpot.gate.typeId === 0
          && coupleSpot.gate.connector === "")){
          allowedCouples.push(i);
        }
        else if(coupleSpot && coupleSpot.showBg){
          break;
        }
      }
    }
    return allowedCouples.sort((a: number, b: number) => {
      return Math.abs(a-gate.bitIdx) - Math.abs(b-gate.bitIdx);
    });
  }

  getCoupledGate(gate: Gate){
    for(let i = 0; this.saves[this.currentSave].bits.length; i++){
      let retgate = this.saves[this.currentSave].bits[i].spots[gate.spotIdx].gate;
      if(retgate.couplingIdx === gate.bitIdx){
        return retgate;
      }
    }
    return gate;
  }

  saveToLocalStorage(){
    localStorage['saves'] = JSON.stringify(this.saves);
  }

  newSave(name: string){
    this.saves.push(new Save(name, this.numQBits, this.numCBits, this.canvasLength));
    this.saves = this.saves.sort((a: Save, b: Save) => {
      return a.lastModified > b.lastModified ? 1 : 0;
    });
    this.currentSave = this.saves.length -1;
    this.savesChange.next(this.currentSave);
    this.currentSaveChange.next(this.currentSave);
  }

  refreshSave(){
    this.saves[this.currentSave].setupBits(this.numQBits, this.numCBits, this.canvasLength); 
    this.currentSaveChange.next(this.currentSave);
  }

  selectSave(currentSave: number){
    this.currentSave = currentSave;
    this.currentSaveChange.next(this.currentSave);
  } 

  saveChanged(){
    this.saveToLocalStorage();
    this.onSaveChange.next(this.currentSave);
  }

  getPresets(): Observable<any> {
    return this.http.get("../assets/presets.json")
                    .map((res: Response) => res.json());
  }

  runSimulation(sim: any): Observable<any>{
    let server = "http://localhost:5000"; 
    return this.http.post(server + "/qcircuit/run", sim)
                    .map((res: Response) => res.json());
  }
}
