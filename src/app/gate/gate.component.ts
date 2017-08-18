import { Component, OnInit, Input } from '@angular/core';
import { Gate } from './gate'

@Component({
  selector: 'gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.css']
})
export class GateComponent implements OnInit {
  @Input() gate: Gate = new Gate();
  ready: boolean = false;

  constructor() { }

  ngOnInit() {
    this.ready = true;
  }

}
