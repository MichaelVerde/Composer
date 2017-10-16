import { Component, OnInit, ViewChild } from '@angular/core';
import { Save } from './save'
import { SavesService } from './saves.service'

@Component({
  selector: 'saves',
  templateUrl: './saves.component.html',
  styleUrls: ['./saves.component.css']
})
export class SavesComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  saveName: string = "";
  savesList: Save[];
  currentSave: number; 
  uploadMsg: string = "";

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
    if(this.saveName != ""){
      this.savesService.newSave(this.saveName);
      this.saveName = "";
    }
  }

  deleteSave(idx: number){
    this.savesService.saves.splice(idx,1);
    this.savesService.saveChanged();
    this.selectSave(idx - 1);  
  }

  selectSave(currentSave: number){
    this.currentSave = currentSave;
    this.savesService.selectSave(currentSave);
  }

  nameChanged($event: any){
    this.savesService.saves = this.savesList;
    this.savesService.saveChanged();
  }

  downloadJSON(idx: number){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.savesService.saves[idx]));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", this.savesService.saves[idx].name + ".json");
    dlAnchorElem.click();
  }

  fileUpload($event: any){
    let file = $event.target.files[0]; 
    let fileInput = this.fileInput.nativeElement;
    var parent = this;
    if(file){
      let reader = new FileReader();
      let savesService = this.savesService;

      /* onLoad event is fired when the load completes. */
      reader.onload = function(event: any) {
          let content = event.target.result; 
          try{
            savesService.saves.push(Save.serialize(JSON.parse(content))); 
            savesService.saveChanged();
            setTimeout(()=> {
              parent.uploadMsg = "";
              fileInput.value = null;
            }, 0);
          }
          catch(e){
            setTimeout(()=> {
              parent.uploadMsg = "Error Occured. Please upload a valid JSON file.";
              fileInput.value = null;
            }, 0);
          }
      };
      /* The readAsText method will read the file's data as a text string. By default the string is decoded as 'UTF-8'. */
      reader.readAsText(file);
    }
    else{
      setTimeout(()=> {
        parent.uploadMsg = "No File. Please upload a valid JSON file.";
        fileInput.value = null;
      }, 0);
    }
  }

}
