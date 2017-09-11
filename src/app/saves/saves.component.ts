import { Component, OnInit } from '@angular/core';
import { Save } from './save'
import { SavesService } from './saves.service'

@Component({
  selector: 'saves',
  templateUrl: './saves.component.html',
  styleUrls: ['./saves.component.css']
})
export class SavesComponent implements OnInit {
  saveName: string = "";
  savesList: Save[];
  currentSave: number; 

  constructor(public savesService: SavesService) {}

  ngOnInit() {
    this.savesList = this.savesService.saves; 
    this.currentSave = this.savesService.currentSave; 
    this.savesService.savesChange.subscribe((value) => { 
      this.savesList = this.savesService.saves;
      this.currentSave = this.savesService.currentSave; 
    });
  }

  createSave(){
    this.savesService.newSave(this.saveName);
  }

  selectSave(currentSave: number){
    this.currentSave = currentSave;
    this.savesService.selectSave(currentSave);
  }

}
