import { Component, OnInit } from '@angular/core';
import {fadeInRightOnEnterAnimation, fadeOutRightBigAnimation, fadeOutRightOnLeaveAnimation} from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../../services/audio.service';
import { CommonService } from '../../../services/common.service';
import {GlobalsService} from "../../../services/globals.service";

const DURATION = { duration: 300 };

@Component({
  selector: 'app-sand-square',
  templateUrl: './sand-square.component.html',
  styleUrls: ['./sand-square.component.scss'],
  animations: [
    fadeInRightOnEnterAnimation(DURATION),
    fadeOutRightOnLeaveAnimation(DURATION),
    fadeOutRightBigAnimation(DURATION)
  ]
})
export class SandSquareComponent implements OnInit {
  // *************************** TEMPLATE CONDITIONS ***************************
  public mainDiv: boolean;
  // ************************* TEMPLATE CONDITIONS END *************************

  public size: number = 150;
  public cornersSize: number = 10;
  public cornersPosition: string = 'out';
  public borders: boolean = true;
  public displayEl: boolean = true;
  public element: boolean = true;
  public menuList: any;

  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      public globalsService: GlobalsService,
  ) {
    this.menuList = [
      { name: 'sandbox.elements_square.none', value: 'none'},
      { name: 'sandbox.elements_square.out', value: 'out'},
      { name: 'sandbox.elements_square.border', value: 'border'},
      { name: 'sandbox.elements_square.in', value: 'in'},
    ]
  }

  ngOnInit() {
    this._data.currentData.subscribe(currentData => this.toggleDiv(currentData));
    this.mainDiv = true;
    if (this.globalsService.firstAppear) {
      this.audioService.audio.routeIn.play();
    }
  }

  valueBoxSizeChanged(e: any) {
    this.size = e.target.value;
  }
  valueCornerSizeChanged(e: any) {
    this.cornersSize = e.target.value;
  }
  valueBordersChanged(value: string) {
    this.cornersPosition = value;
  }
  // uses with custom HTML select
  // valueBordersChanged(e: any) {
  //   this.cornersPosition = e.srcElement.value;
  // }
  valueBordersDisplay() {
    this.borders = !this.borders;
  }
  valueDisplayElement() {
    this.element = !this.element;
  }

  restartItem() {
    this.displayEl = false;
    setTimeout(() => this.displayEl = true, 50);
  }

  resetItem() {
    this.size = 150;
    this.cornersSize = 10;
    this.cornersPosition = 'out';
    this.borders = true;
    this.element = true
  }

  valueSoundChanged() {
    this.audioService.audio.applySND.play();
  }

  hoverSound() {
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
      this.mainDiv = !this.mainDiv;
      this.audioService.audio.routeOut.play();
    }
  }
  // ************************* TEMPLATE CONDITIONS END *************************
}
