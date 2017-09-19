import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QBit } from "../gate-canvas/canvas-classes";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'qbit',
  templateUrl: './qbit.component.html',
  styleUrls: ['./qbit.component.css']
})
export class QbitComponent implements OnInit {
  @Input() qbit: QBit;
  @ViewChild('content') public content;

  constructor(public modalService: NgbModal) { }

  ngOnInit() {
  }

  open() {
    this.modalService.open(this.content);     
  }

  getKet(){
    if (this.qbit.mode === 1){
      return "α";
    }
    else if (this.qbit.mode === 2){
      return "α, ℝ, φ";
    }
    else if (this.qbit.mode === 3){
      return "n";
    }
    else{
      return "0";
    }
  }

}
