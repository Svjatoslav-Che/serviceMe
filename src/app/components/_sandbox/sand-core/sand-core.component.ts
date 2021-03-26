import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { fadeInRightOnEnterAnimation, fadeOutRightOnLeaveAnimation } from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../../services/audio.service';
import { CommonService } from '../../../services/common.service';
import {GlobalsService} from "../../../services/globals.service";

const DURATION = { duration: 300 };

@Component({
  selector: 'app-sand-core',
  templateUrl: './sand-core.component.html',
  styleUrls: ['./sand-core.component.scss'],
  animations: [
    fadeInRightOnEnterAnimation(DURATION),
    fadeOutRightOnLeaveAnimation(DURATION)
  ]
})
export class SandCoreComponent implements OnInit {
  // *************************** TEMPLATE CONDITIONS ***************************
  public mainDiv: boolean;
  // ************************* TEMPLATE CONDITIONS END *************************

  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      public globalsService: GlobalsService,
  ) {}

  ngOnInit() {
    this._data.currentData.subscribe(currentData => this.toggleDiv(currentData));
    this.mainDiv = true;
    if (this.globalsService.firstAppear) {
      this.audioService.audio.routeIn.play();
    }
  }

  hoverSound() {
    this.audioService.audio.selectSND.play();
  }

  clickSound() {
    this.audioService.audio.clickSND.play();
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
