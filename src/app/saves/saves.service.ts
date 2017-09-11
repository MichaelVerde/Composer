import { Injectable } from '@angular/core';
import { Save } from './save'

@Injectable()
export class SavesService {
  public saves: Save[] = [];
  public currentSave: Save;  

  constructor() { 
      this.currentSave = new Save("temp");
      this.saves.push(this.currentSave);
  }
}
