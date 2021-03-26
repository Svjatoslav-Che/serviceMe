import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { fadeInRightOnEnterAnimation, fadeOutRightOnLeaveAnimation } from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../../services/audio.service';
import { CommonService } from '../../../services/common.service';
import {GlobalsService} from "../../../services/globals.service";
// import { JQueryStyleEventEmitter } from "rxjs/internal/observable/fromEvent";

const DURATION = { duration: 300 };

@Component({
  selector: 'app-sand-elements',
  templateUrl: './sand-elements.component.html',
  styleUrls: ['./sand-elements.component.scss'],
  animations: [
    fadeInRightOnEnterAnimation(DURATION),
    fadeOutRightOnLeaveAnimation(DURATION)
  ]
})
export class SandElementsComponent implements OnInit {
  // *************************** TEMPLATE CONDITIONS ***************************
  public mainDiv: boolean;
  // ************************* TEMPLATE CONDITIONS END *************************
  public size: number = 50;

  // public size: number = 150;
  public cornersSize: number = 10;
  public cornersPosition: string = 'out';
  public borders: boolean = true;
  public displayEl: boolean = true;
  public element: boolean = true;
  public elementDisplay: string = 'drop';
  public menuListElements: any;
  public menuListSimplyElements: any;
  public elementSimplyDisplay: string = 'value1';
  public simplyRange: number = 20;
  public radioData: any;

  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      public globalsService: GlobalsService,
  ) {
    this.menuListElements = [
      { name: 'sandbox.elements_sheet.droplist', value: 'drop'},
      { name: 'sandbox.elements_sheet.smalls', value: 'small'},
      { name: 'sandbox.elements_sheet.range', value: 'range'},
    ]
    this.menuListSimplyElements = [
      { name: 'sandbox.elements_sheet.value_1', value: 'value1'},
      { name: 'sandbox.elements_sheet.value_2', value: 'value2'},
    ]
  }

  ngOnInit() {
    this._data.currentData.subscribe(currentData => this.toggleDiv(currentData));
    this.mainDiv = true;
    if (this.globalsService.firstAppear) {
      this.audioService.audio.routeIn.play();
    }
  }

  valueElementChanged(e: any) {
    this.elementDisplay = e;
  }

  valueDisplayElement() {
    this.element = !this.element;
  }

  valueSimplyChanged(e: any) {
    this.elementSimplyDisplay = e;
  }

  valueRangeChanged(e: any) {
    this.simplyRange = Math.floor(e.target.value);
    this.audioService.audio.applySND.play();
  }

  applySoundPlay() {
    this.audioService.audio.applySND.play();
  }

  hoverSoundPlay() {
    this.audioService.audio.selectSND.play();
  }

  // *************************** TEMPLATE CONDITIONS ***************************
  animInStart(event: AnimationEvent) {
  }

  animInDone(event: AnimationEvent) {
  }

  animOutStart(event: AnimationEvent) {
  }

  animOutDone(event: AnimationEvent) {
  }

  toggleDiv(currentData) {
    if (currentData.action === 'second route activated') {
      if (this.mainDiv) {
        this.audioService.audio.routeOut.play();
      }
      this.mainDiv = false;
    }
  }
  // ************************* TEMPLATE CONDITIONS END *************************
}
