import { Injectable } from '@angular/core';
import { Save } from './save'
import {Subject} from 'rxjs/Subject';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SavesService {
  public numQBits: number = 5;
  public numCBits: number = 5;
  public canvasLength: number = 40;
  public saves: Save[] = [];
  public currentSave: number;  
  savesChange: Subject<number> = new Subject<number>();
  currentSaveChange: Subject<number> = new Subject<number>();

  constructor(public http: Http) {}

  getSaves(){
    this.getPresets().subscribe(presets => {
      presets.forEach(save =>{
        this.saves.push(Save.serialize(save));
      });
      this.newSave("New");
    }, error => console.log(error));
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
    console.log(JSON.stringify(this.saves));
  } 

  getPresets(): Observable<any> {
    return this.http.get("../assets/presets.json")
                    .map((res: Response) => res.json());
  }

  runSimulation(sim: any): Observable<any>{
    return this.http.post("http://localhost:5000/qcircuit/run", sim)
                    .map((res: Response) => res.json());
  }
}
