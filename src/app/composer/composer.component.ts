import { Component, OnInit } from '@angular/core';
import { Gate } from "../gate/gate";
import { SavesService } from '../saves/saves.service';

@Component({
  selector: 'composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css']
})
export class ComposerComponent implements OnInit {
  dragData?: Gate = null;
  numQBits: number = 5;
  numCBits: number = 5;
  canvasLength: number = 40;

  constructor(public savesService: SavesService) { 
  }

  ngOnInit() {
    this.savesService.numQBits = this.numQBits;
    this.savesService.numCBits = this.numCBits;
    this.savesService.canvasLength = this.canvasLength;

    this.savesService.currentSaveChange.subscribe((value) => { 
      this.numQBits = this.savesService.saves[value].numQBits; 
      this.numCBits = this.savesService.saves[value].numCBits; 
      this.canvasLength = this.savesService.saves[value].canvasLength; 
    });
  }

  setDragging(gate?: Gate){
    this.dragData = gate;
  }

  numQBitsChanged(){
    if(this.savesService.numCBits > this.savesService.numQBits){
      this.savesService.numCBits = this.savesService.numQBits;
    }
    this.updateSettings();
  }

  updateSettings(){
    this.savesService.numQBits = this.numQBits;
    this.savesService.numCBits = this.numCBits;
    this.savesService.canvasLength = this.canvasLength;
    this.savesService.refreshSave(); 
  }

}
