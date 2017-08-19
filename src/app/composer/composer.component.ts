import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css']
})
export class ComposerComponent implements OnInit {
  numBits: number = 5; 

  constructor() { }

  ngOnInit() {
  }

}
