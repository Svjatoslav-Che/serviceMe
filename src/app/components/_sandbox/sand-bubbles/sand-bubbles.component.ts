import { Component, OnInit } from '@angular/core';
import { fadeInRightOnEnterAnimation, fadeOutRightOnLeaveAnimation } from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../../services/audio.service';
import { CommonService } from '../../../services/common.service';
import { GlobalsService } from '../../../services/globals.service';

const DURATION = { duration: 300 };
const CURSORSYMBOL: string = '▊';

@Component({
  selector: 'app-sand-bubbles',
  templateUrl: './sand-bubbles.component.html',
  styleUrls: ['./sand-bubbles.component.scss'],
  animations: [
    fadeInRightOnEnterAnimation(DURATION),
    fadeOutRightOnLeaveAnimation(DURATION)
  ]
})
export class SandBubblesComponent implements OnInit {
  // *************************** TEMPLATE CONDITIONS ***************************
  public mainDiv: boolean;
  // ************************* TEMPLATE CONDITIONS END *************************

  public dataContent: any =  {
    header: 'Lorem Ipsum',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    text: '<h1>Lorem Ipsum</h1> has been the industrys standard dummy text ever <a>since the 1500s</a>, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br><br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing..',
    date: '20.20.2020 END'
  };

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

  remoteRouterScenario(value) {
    this._data.updateMessage({
      subject: 'user',
      location: 'sandbox table',
      action: 'first route activate',
      description: 'remote first route activated',
      params: value,
      date: Date()
    });
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

