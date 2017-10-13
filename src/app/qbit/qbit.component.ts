import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QBit } from "../gate-canvas/canvas-classes";
import { SavesService } from '../saves/saves.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'qbit',
  templateUrl: './qbit.component.html',
  styleUrls: ['./qbit.component.css']
})
export class QbitComponent implements OnInit {
  @Input() qbit: QBit;
  @ViewChild('content') public content;

  constructor(public modalService: NgbModal, public savesService: SavesService) { }

  ngOnInit() {
    if(!this.qbit.parameters){
      this.setParameters();
    }
  }

  setParameters(parameters?: any[]){
    this.qbit.parameters = [];
    if(this.qbit.mode == 5){
      this.qbit.parameters.push({
        'name': 'Parity',
        'even': true
      });
    }
    if(this.qbit.mode === 1 ||  this.qbit.mode === 4 ||  this.qbit.mode === 5){
      this.qbit.parameters.push({
        'name': 'α',
        'a': 0,
        'b': 0,
        'r': 0,
        'phi': 0,
        'phaseMode': false
      });
    }
    if(this.qbit.mode === 2 || this.qbit.mode === 4){
      this.qbit.parameters.push({
        'name': 'ξ',
        'a': 0,
        'b': 0,
        'r': 0,
        'phi': 0,
        'phaseMode': true
      });
    }
    if(this.qbit.mode === 3){
      this.qbit.parameters.push({
        'name': 'n',
        'n': 0
      });
    }
  }

  open() {
    this.modalService.open(this.content).result.then((result) => {
      this.savesService.saveChanged();
    }, (reason) => {
      this.savesService.saveChanged();
    });  ;     
  }

  getKet(){
    if(this.qbit.mode === 5){
      return "cat";
    }
    else if(this.qbit.parameters.length > 0){
      let ketStr = "";
      for(let i = 0; i< this.qbit.parameters.length; i++){
        ketStr += this.qbit.parameters[i].name;
        if(i !== this.qbit.parameters.length -1) ketStr += ", ";
      }
      return ketStr;
    }
    else{
      return "0";
    }
  }

  getKetSate(){
    if(this.qbit.mode === 5){
      return this.qbit.parameters[0].even ? "e" : "o";
    }
    else{
      return "";
    }
  }


  togglePhase(idx: number){
    this.qbit.parameters[idx].phaseMode = !this.qbit.parameters[idx].phaseMode;
  }

}
