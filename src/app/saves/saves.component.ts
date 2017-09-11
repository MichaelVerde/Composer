import { Component, OnInit } from '@angular/core';
import { Save } from './save'
import { SavesService } from './saves.service'

@Component({
  selector: 'saves',
  templateUrl: './saves.component.html',
  styleUrls: ['./saves.component.css']
})
export class SavesComponent implements OnInit {
  saveText: string = "";

  constructor(public savesService: SavesService) { }

  ngOnInit() {
  }

  createSave(){
    this.savesService.currentSave = new Save(this.saveText);
  }

}
