import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeInDownOnEnterAnimation, fadeOutUpOnLeaveAnimation } from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../services/audio.service';
import { CommonService } from '../../services/common.service';
import { GlobalsService } from "../../services/globals.service";
import { ActionService } from "../../services/action.service";

const DURATION = { duration: 300 };

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    fadeInDownOnEnterAnimation(DURATION),
    fadeOutUpOnLeaveAnimation(DURATION)
  ]
})

export class AboutComponent implements OnInit, OnDestroy {
  public mainDiv: boolean;

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
        'about page',
        'about page open',
        'about page open',
        'open'
    );
    if (this.globalsService.userLogged) {
      let achieve = this.globalsService.achievesList.default;
      if (achieve !== undefined && achieve.visit_page.visit_about.state === 'none') {
        this.actionService.actionGenerator(
            'system',
            'about page',
            'solve',
            'visit mainpage solved',
            'visit_about'
        );
      }
    }
  }

  ngOnDestroy() {
    this.actionService.actionGenerator(
        'system',
        'about page',
        'about page close',
        'about page close',
        'close'
    );
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
    if (currentData.action === 'first route activate') {
      if (this.mainDiv) {
        this.audioService.audio.routeOut.play();
      }
      this.mainDiv = false;
    }
  }
  // ************************* TEMPLATE CONDITIONS END *************************
}
