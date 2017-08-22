import { Component, OnInit } from '@angular/core';
import { Gate } from "../gate/gate"

@Component({
  selector: 'composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css']
})
export class ComposerComponent implements OnInit {
  numQBits: number = 5; 
  numCBits: number = 5; 
  canvasLength: number = 40; 
  dragData?: Gate = null;

  constructor() { }

  ngOnInit() {
  }

  setDragging(gate?: Gate){
    this.dragData = gate;
  }

  numQBitsChanged(){
    if(this.numCBits > this.numQBits){
      this.numCBits = this.numQBits;
    }
  }

}
