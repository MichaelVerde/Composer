import { Injectable } from '@angular/core';
import { Save } from './save'
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SavesService {
  public numQBits: number;
  public numCBits: number;
  public canvasLength: number = 40;
  public saves: Save[] = [];
  public currentSave: number;  
  savesChange: Subject<number> = new Subject<number>();
  currentSaveChange: Subject<number> = new Subject<number>();

  constructor() { 
  }

  newSave(name: string){
    this.currentSave = this.saves.length;
    this.saves.push(new Save(name, this.numQBits, this.numCBits, this.canvasLength));
    this.savesChange.next(this.currentSave);
    this.currentSaveChange.next(this.currentSave);
  }

  refreshSave(){
    this.saves[this.currentSave] = new Save(this.saves[this.currentSave].name, this.numQBits, this.numCBits, this.canvasLength);
    this.currentSaveChange.next(this.currentSave);
  }

  selectSave(currentSave: number){
    this.currentSave = currentSave;
    this.currentSaveChange.next(this.currentSave);
  }


}
