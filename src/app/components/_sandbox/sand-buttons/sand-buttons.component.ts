import { Component, OnInit } from '@angular/core';
import {fadeInRightOnEnterAnimation, fadeOutRightBigAnimation, fadeOutRightOnLeaveAnimation} from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../../services/audio.service';
import { CommonService } from '../../../services/common.service';
import {GlobalsService} from "../../../services/globals.service";

const DURATION = { duration: 300 };

@Component({
  selector: 'app-sand-buttons',
  templateUrl: './sand-buttons.component.html',
  styleUrls: ['./sand-buttons.component.scss'],
  animations: [
    fadeInRightOnEnterAnimation(DURATION),
    fadeOutRightOnLeaveAnimation(DURATION),
    fadeOutRightBigAnimation(DURATION)
  ]
})
export class SandButtonsComponent implements OnInit {
  // *************************** TEMPLATE CONDITIONS ***************************
  public mainDiv: boolean;
  // ************************* TEMPLATE CONDITIONS END *************************

  // public size: number = 200;
  // public cornersSize: number = 10;
  // public cornersPosition: string = 'out';
  // public borders: boolean = true;
  public displayEl: boolean = true;
  public element: string = 'small';
  public menuListButtons: any;

  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      public globalsService: GlobalsService,
  ) {
    this.menuListButtons = [
      { name: 'sandbox.elements_buttons.small', value: 'small'},
      { name: 'sandbox.elements_buttons.casual', value: 'casual'},
      { name: 'sandbox.elements_buttons.header', value: 'header'},
    ]
  }

  ngOnInit() {
    this._data.currentData.subscribe(currentData => this.toggleDiv(currentData));
    this.mainDiv = true;
    if (this.globalsService.firstAppear) {
      this.audioService.audio.routeIn.play();
    }
  }

  valueDisplayerChange(e: any) {
    this.element = e;
  }

  restartItem() {
    this.displayEl = false;
    setTimeout(() => this.displayEl = true, 50);
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
