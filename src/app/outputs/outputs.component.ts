import { Component, OnInit } from '@angular/core';
import { Output } from './output'

@Component({
  selector: 'outputs',
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.css']
})
export class OutputsComponent {
  outputs: Output[];
  selectedOutput: number; 
  view: any[] = [800, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  
   // line, area
   autoScale = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    this.outputs = [];
    this.outputs.push(new Output(1, "Photon Counts"));
    this.outputs.push(new Output(2, "Probabilities"));
    this.outputs.push(new Output(3, "Wigner Function"));
  }
  
  onSelect(event) {
    console.log(event);
  }

}
