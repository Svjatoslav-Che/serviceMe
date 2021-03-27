import {Component, OnInit} from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../services/audio.service';
import { CommonService } from '../../services/common.service';
import { GlobalsService } from "../../services/globals.service";

const DURATION = { duration: 300 };
const CURSORSYMBOL: string = '▊';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeInOnEnterAnimation(DURATION),
    fadeOutOnLeaveAnimation(DURATION)
  ]
})

export class HomeComponent implements OnInit {
  // private subTimer: Subscription;
  // private varTimer;
  // public blancSymbol: string;
  // public loadingDone: boolean = false;
  // public hideLoading: boolean = false;
  // public displayDraw: boolean = false;

  // public innerWidth: number = 0;
  public mainDiv: boolean;
  // public animationIn: boolean = false;


  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      public globalsService: GlobalsService,
  ) {}


  ngOnInit() {
    this._data.currentData.subscribe(currentData => this.toggleDiv(currentData));
    this.mainDiv = true;
    // if (this.globalsService.firstAppear) {
    //   this.audioService.audio.routeIn.play();
    // }

    // disable loader

    this.globalsService.firstDrawLoad = true;

    // if (!this.globalsService.loads) {
    //   this.varTimer = timer(0, 50);
    //   this.subTimer = this.varTimer.subscribe(value => {
    //     // this.action = value;
    //
    //     if (value >= 50) {
    //       this.demountDelayer()
    //       this.subTimer.unsubscribe();
    //       this.varTimer = undefined;
    //     }
    //   })
    // }

  }

  // demountDelayer() {
  //   // this.hideLoading = true;
  //     setTimeout(()=> {
  //       this.globalsService.loads = true;
  //     }, 300);
  //   // setTimeout(()=> {
  //   //   this.displayDraw = true;
  //   // }, 400);
  // }

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
      this.mainDiv = false;
      // this.audioService.audio.routeOut.play();
    }
  }
  // ************************* TEMPLATE CONDITIONS END *************************
}
