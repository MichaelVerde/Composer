import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css']
})
export class ComposerComponent implements OnInit {
  numQBits: number = 5; 
  numCBits: number = 5; 
  canvasLength: number = 40; 
  dragging: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  setDragging(dragging: boolean){
    this.dragging = dragging;
  }

}
