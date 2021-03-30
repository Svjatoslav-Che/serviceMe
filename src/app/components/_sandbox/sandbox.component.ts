import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeInLeftOnEnterAnimation, fadeOutLeftOnLeaveAnimation } from 'angular-animations';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../services/audio.service';
import { CommonService } from '../../services/common.service';
import { GlobalsService } from '../../services/globals.service';
import { ActionService } from '../../services/action.service';

const DURATION = { duration: 300 };

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
  animations: [
    fadeInLeftOnEnterAnimation(DURATION),
    fadeOutLeftOnLeaveAnimation(DURATION)
  ]
})
export class SandboxComponent implements OnInit, OnDestroy {
  public valueSelect: string;
  public mainDiv: boolean;
  public secondRoute: string;
  public routeList: any;

  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      private router: Router,
      private globalsService: GlobalsService,
      private actionService: ActionService
  ) {
    this.routeList = [
      { class: 'main', name: 'sandbox.about', route: '/sandbox' },

      { class: 'descriptor', name: 'sandbox.foundation'},
      { class: 'foundation', name: 'sandbox.basic', route: '/sandbox/basics' },
      { class: 'foundation', name: 'sandbox.table', route: '/sandbox/table' },
      { class: 'foundation', name: 'sandbox.bootstrap', route: '/sandbox/bootstrap' },
      { class: 'foundation', name: 'sandbox.elements', route: '/sandbox/elements' },
      { class: 'foundation', name: 'sandbox.bubbles', route: '/sandbox/bubbles' },

      { class: 'descriptor', name: 'sandbox.objects'},
      { class: 'objects', name: 'sandbox.square', route: '/sandbox/square' },
      { class: 'objects', name: 'sandbox.box', route: '/sandbox/smartbox' },
      { class: 'objects', name: 'sandbox.buttons', route: '/sandbox/buttons' },
      { class: 'objects', name: 'sandbox.headers', route: '/sandbox/headers' },
      { class: 'objects', name: 'sandbox.graphs', route: '/sandbox/graph' },
      { class: 'objects', name: 'sandbox.icons', route: '/sandbox/icons' },
      { class: 'objects', name: 'sandbox.animation', route: '/sandbox/animations' },
      { class: 'objects', name: 'sandbox.loader', route: '/sandbox/loader' },
      { class: 'objects', name: 'sandbox.sounds', route: '/sandbox/sounds' },

      { class: 'descriptor', name: 'sandbox.services'},
      { class: 'services', name: 'sandbox.popup', route: '/sandbox/popup' },
      { class: 'services', name: 'sandbox.404', route: '/sandbox/**' },

      { class: 'descriptor', name: 'sandbox.futures'},
      { class: 'descriptor', name: 'sandbox.futures_description_1'},
      { class: 'services', name: 'sandbox.achievements', route: '/sandbox/achives' },
      { class: 'services', name: 'sandbox.pushup', route: '/sandbox/pushup' },

      { class: 'descriptor', name: 'sandbox.futures_description_2'},
      { class: 'services', name: 'sandbox.core', route: '/sandbox/core' },
      { class: 'services', name: 'sandbox.assistant', route: '/sandbox/assistant' },
      { class: 'services', name: 'sandbox.structure', route: '/sandbox/structure' },
    ]
  }

  ngOnInit() {
    this._data.currentData.subscribe(currentData => this.toggleDiv(currentData));
    this.firstRouteCheck();
    this.mainDiv = true;
    this.actionService.actionGenerator(
        'system',
        'sandbox page',
        'sandbox page open',
        'sandbox page open',
        'open'
    );
  }

  ngOnDestroy() {
    this.actionService.actionGenerator(
        'system',
        'sandbox page',
        'sandbox page close',
        'sandbox page close',
        'close'
    );
  }

  animInStart(event: AnimationEvent) {

  }

  animInDone(event: AnimationEvent) {

  }

  animOutStart(event: AnimationEvent) {
    // if (this.globalsService.firstAppear) {
    //   this.audioService.audio.routeOut.play();
    // }
  }

  animOutDone(event: AnimationEvent) {

  }

  animInSmallStart(event: AnimationEvent) {

  }

  animInSmallDone(event: AnimationEvent) {

  }

  animOutSmallStart(event: AnimationEvent) {

  }

  animOutSmallDone(event: AnimationEvent) {

  }

  toggleDiv(currentData) {
    if (currentData.action === 'first route activate') {
      if (this.mainDiv) {
        this.audioService.audio.routeOut.play();
      }
      this.mainDiv = false;
    }
  }

  firstRouteCheck() {
    let value = this.router.routerState.snapshot.url;
    this.secondRoute = value;
  }

  routerScenario(value): any {
    this.actionService.actionGenerator(
        'user',
        'sandbox page',
        'button click',
        this.router.routerState.snapshot.url === value ? 'empty click' : 'router click',
        value
    );
    if (this.router.routerState.snapshot.url !== value) {
      this.secondRoute = value;
      this.actionService.actionGenerator(
          'user',
          'sandbox page',
          'second route activated',
          'remote second route activated',
          value
      );
      setTimeout(() => {this.router.navigate([value])}, 300);
    }
  }

  hoverSound() {
      this.audioService.audio.selectSND.play();
  }

  clickSound() {
      this.audioService.audio.clickSND.play();
  }
}
