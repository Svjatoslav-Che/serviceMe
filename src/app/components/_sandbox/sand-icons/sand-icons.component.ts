import { Component, OnInit } from '@angular/core';
import {fadeInRightOnEnterAnimation, fadeOutRightBigAnimation, fadeOutRightOnLeaveAnimation} from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../../services/audio.service';
import { CommonService } from '../../../services/common.service';
import {GlobalsService} from "../../../services/globals.service";

const DURATION = { duration: 300 };

@Component({
  selector: 'app-sand-icons',
  templateUrl: './sand-icons.component.html',
  styleUrls: ['./sand-icons.component.scss'],
  animations: [
    fadeInRightOnEnterAnimation(DURATION),
    fadeOutRightOnLeaveAnimation(DURATION),
    fadeOutRightBigAnimation(DURATION)
  ]
})
export class SandIconsComponent implements OnInit {
  // *************************** TEMPLATE CONDITIONS ***************************
  public mainDiv: boolean;
  // ************************* TEMPLATE CONDITIONS END *************************
  public headerIcons: any;
  public buttonIcons: any;
  public elementsIcons: any;

  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      public globalsService: GlobalsService,
  ) {
      this.headerIcons = ['HOME', 'ABOUT', 'SANDBOX', 'ACHIVES', 'ANGULAR', 'LOGIN', 'LOGOUT', 'ACTIONS', 'JP', 'DELETE', 'RJsX', 'IDEA', 'PUZZLE'];
      this.buttonIcons = ['angular', 'settings', 'bug', 'gitlab', 'in', 'picture', 'potato', 'bubble', 'green', 'blue', 'pink', 'gray', 'addpic', 'cookie',
                          'github', 'unmute', 'mute', 'ambient', 'ambientMute', 'receive'];
      this.elementsIcons = ['BASIC', 'TABLE', 'BOOTSTRAP', 'ELEMENTS', 'POP UP', 'GRAPHS', 'SOUNDS', 'BUTTONS', 'SQUARE',
                            'BOX', 'HEADERS', 'ICONS', 'ANIMATION', 'LOADER', 'ASSISTANT', 'STRUCTURE', 'PUSH', 'CORE', 'ASK'];
  }

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

