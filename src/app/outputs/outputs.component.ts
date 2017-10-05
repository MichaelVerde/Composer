import { Component, OnInit, ViewChild } from '@angular/core';
import { Output } from './output'
import { SavesService } from '../saves/saves.service';
import { Save } from '../saves/save';

@Component({
  selector: 'outputs',
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.css']
})
export class OutputsComponent {
  outputs: Output[];
  numShots: number;
  backendType: string;
  outputToAdd: number;
  showThisStuff: string = "";
  view: any[] = [800, 300];

  @ViewChild('t') public t;

  backendList: string[] =[
    "NumPy",
    "TensorFlow",
    "Gaussian" 
  ]

  outputsList: Output[];


   // line, area
   autoScale = false;

  colorScheme = {
    domain: ['#5AA454']
  };

  constructor(public savesService: SavesService) {
    this.outputsList = [];
    this.outputsList.push(new Output(1, "Photon Numbers", savesService.numCBits));
    this.outputsList.push(new Output(2, "Probabilities", savesService.numCBits));
    this.outputsList.push(new Output(3, "Wigner Function", 4));
    this.outputsList.push(new Output(4, "Code", 0));
    this.outputToAdd = 0;

    this.outputs = [];
    this.backendType = this.backendList[0];
    this.numShots = 100;
  }
  
  addOutput(){
    if(this.outputsList.length > 0){
      this.outputs.push(this.outputsList[this.outputToAdd]);
      this.outputsList.splice(this.outputToAdd,1);
      let id = 'tab' + (this.outputs.length -1).toString();
      if(this.t){
        this.t.activeId = id;
      }
      this.outputToAdd = 0;
    }
  }

  rmOutput(idx: number, $event: any){
    $event.preventDefault();
    this.outputsList.push(this.outputs[idx]);
    this.outputs.splice(idx,1);
    this.outputsList.sort((a,b) => {
      return a.typeId - b.typeId;
    })
  }

  runSimulation(){
    let sim: Simulation = {
      outputs: this.outputs,
      numShots: this.numShots,
      backendType: this.backendType,
      save: this.savesService.saves[this.savesService.currentSave]
    }
    this.savesService.runSimulation(sim).subscribe(this.extractData);
  }

  extractData(res: any) {
    let body: Output[] = res._body;
    this.outputs = body;
  }
}

interface Simulation {
  outputs: Output[];
  numShots: number;
  backendType: string;
  save: Save;
}


