import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Output } from './output'
import { SavesService } from '../saves/saves.service';
import { Save } from '../saves/save';

@Component({
  selector: 'outputs',
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.css']
})
export class OutputsComponent implements AfterViewInit{
  outputs: Output[];
  numShots: number;
  backendType: string;
  outputToAdd: number;
  selectedOutput: number;
  errorMsg: string = "";
  running: boolean = false;
  sampling: boolean = false;
  cutoff: number;

  @ViewChild('t') public t;
  @ViewChild('chart') public chart: ElementRef;

  backendList: string[] =[
    "NumPy",
    "TensorFlow",
    "Gaussian" 
  ]

  outputsList: Output[];

  constructor(public savesService: SavesService) {
    this.outputsList = [];
    this.outputsList.push(new Output(1, "Fock States", savesService.numCBits));
    this.outputsList.push(new Output(2, "Quadratues", savesService.numCBits));
    
    this.outputs = [];
    this.outputs.push(new Output(3, "Wigner Function", 1));
    this.outputs.push(new Output(4, "Code", 0));
    this.selectedOutput = 0;
    this.outputToAdd = 0;

    this.backendType = this.backendList[0];
    this.numShots = 100;
    this.cutoff = 5;
  }

  ngAfterViewInit(){
    this.basicChart();
  }

  basicChart() {
    if(this.chart){
      let element = this.chart.nativeElement;
      Plotly.purge( element );
      if(this.outputs[this.selectedOutput].chart){
        Plotly.plot( element, this.outputs[this.selectedOutput].chart);
      }
    }
  }

  setSelectedOutput(idx: number){
    this.selectedOutput = idx;
    this.basicChart();
  }

  outputChange($event: any) {
    this.setSelectedOutput(parseInt($event.nextId.substr(3)));
  };

  setSelectedTab(idx: number){
    let id = 'tab' + (idx).toString();
    if(this.t){
      this.t.activeId = id;
    }
    this.setSelectedOutput(idx);
  }
  
  addOutput(){
    if(this.outputsList.length > 0 && !this.running){
      this.outputs.push(this.outputsList[this.outputToAdd]);
      this.outputsList.splice(this.outputToAdd,1);
      this.setSelectedTab(this.outputs.length -1);
      this.outputToAdd = 0;
    }
  }

  rmOutput(idx: number, $event: any){
    if(!this.running){
      $event.preventDefault();
      this.outputsList.push(this.outputs[idx]);
      this.outputs.splice(idx,1);
      this.outputsList.sort((a,b) => {
        return a.typeId - b.typeId;
      });
    }
  }

  runSimulation(){
    if(this.outputs.length > 0 && !this.running){
      this.running = true;
      let sim: Simulation = {
        outputs: this.outputs,
        numShots: this.numShots,
        backendType: this.backendType,
        sampling: this.sampling,
        save: this.savesService.saves[this.savesService.currentSave]
      }
      this.savesService.runSimulation(sim).subscribe(
        outputs => {
          this.running = false;
          this.outputs = outputs;
          this.errorMsg = "";
        },
        error => {
          this.running = false;
          if(error.status === 400){
            this.errorMsg = error.json().message;
          }
          else{
            this.errorMsg = "Unable to connect to server to run simulation. " + error;
          }
        }
      );
    }
  }
}

interface Simulation {
  outputs: Output[];
  numShots: number;
  sampling: boolean;
  backendType: string;
  save: Save;
}


