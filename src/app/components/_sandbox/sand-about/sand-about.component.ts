import { Component, OnInit } from '@angular/core';
import {fadeInRightOnEnterAnimation, fadeOutRightBigAnimation, fadeOutRightOnLeaveAnimation} from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../../services/audio.service';
import { CommonService } from '../../../services/common.service';
import { GlobalsService } from "../../../services/globals.service";

const DURATION = { duration: 300 };

@Component({
  selector: 'app-sand-about',
  templateUrl: './sand-about.component.html',
  styleUrls: ['./sand-about.component.scss'],
  animations: [
    fadeInRightOnEnterAnimation(DURATION),
    fadeOutRightOnLeaveAnimation(DURATION),
    fadeOutRightBigAnimation(DURATION)
  ]
})
export class SandAboutComponent implements OnInit {
  // *************************** TEMPLATE CONDITIONS ***************************
  public mainDiv: boolean;
  // ************************* TEMPLATE CONDITIONS END *************************
  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      private globalsService: GlobalsService,
  ) {}

  ngOnInit() {
    this._data.currentData.subscribe(currentData => this.toggleDiv(currentData));
    this.mainDiv = true;
    if (this.globalsService.firstAppear) {
      this.audioService.audio.routeIn.play();
    }
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
