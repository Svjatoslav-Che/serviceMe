import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeInDownOnEnterAnimation, fadeOutUpOnLeaveAnimation } from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../services/audio.service';
import { CommonService } from '../../services/common.service';
import { GlobalsService } from '../../services/globals.service';
import { ActionService } from "../../services/action.service";

const DURATION = { duration: 300 };

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss'],
  animations: [
    fadeInDownOnEnterAnimation(DURATION),
    fadeOutUpOnLeaveAnimation(DURATION)
  ]
})

export class AchievementComponent implements OnInit, OnDestroy {
  public mainDiv: boolean = false;

  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      public globalsService: GlobalsService,
      private actionService: ActionService
  ) {}

  ngOnInit() {
    this._data.currentData.subscribe(currentData => this.toggleDiv(currentData));
    this.mainDiv = true;
    if (this.globalsService.firstAppear) {
      this.audioService.audio.routeIn.play();
    }
    this.actionService.actionGenerator(
        'system',
        'achieves page',
        'achieves page open',
        'achieves page open',
        'open'
    );
    // console.log(this.globalsService.achievesList.default);
  }

  ngOnDestroy() {
    this.actionService.actionGenerator(
        'system',
        'achieves page',
        'achieves page close',
        'achieves page close',
        'close'
    );
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
    if (currentData.action === 'first route activate') {
      if (this.mainDiv) {
        this.audioService.audio.routeOut.play();
      }
      this.mainDiv = false;
    }
  }
  // ************************* TEMPLATE CONDITIONS END *************************
}
