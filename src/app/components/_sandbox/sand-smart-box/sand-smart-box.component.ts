import { Component, OnInit } from '@angular/core';
import { fadeInRightOnEnterAnimation, fadeOutRightOnLeaveAnimation } from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../../services/audio.service';
import { CommonService } from '../../../services/common.service';
import { GlobalsService } from "../../../services/globals.service";

const DURATION = { duration: 300 };

@Component({
  selector: 'app-sand-smart-box',
  templateUrl: './sand-smart-box.component.html',
  styleUrls: ['./sand-smart-box.component.scss'],
  animations: [
    fadeInRightOnEnterAnimation(DURATION),
    fadeOutRightOnLeaveAnimation(DURATION)
  ]
})
export class SandSmartBoxComponent implements OnInit {
  // *************************** TEMPLATE CONDITIONS ***************************
  public mainDiv: boolean;
  // ************************* TEMPLATE CONDITIONS END *************************
  public size: number = 50;

  // public size: number = 150;
  public cornersSize: number = 10;
  public cornersPosition: string = 'out';
  public borders: boolean = true;
  public displayEl: boolean = true;
  public element: boolean = true;
  public headerPosition: string = 'left';
  public menuListHeader: any;
  public menuListCorners: any;

  public boxHeader: string;
  public boxDescription: string;
  public boxText: string;

  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      public globalsService: GlobalsService,
  ) {
    this.menuListHeader = [
      { name: 'sandbox.elements_box.left', value: 'left'},
      { name: 'sandbox.elements_box.centre', value: 'centre'},
      { name: 'sandbox.elements_box.right', value: 'right'},
    ]
    this.menuListCorners = [
      { name: 'sandbox.elements_box.none', value: 'none'},
      { name: 'sandbox.elements_box.out', value: 'out'},
      { name: 'sandbox.elements_box.border', value: 'border'},
      { name: 'sandbox.elements_box.in', value: 'in'},
    ]
  }

  ngOnInit() {
    this._data.currentData.subscribe(currentData => this.toggleDiv(currentData));
    this.mainDiv = true;
    if (this.globalsService.firstAppear) {
      this.audioService.audio.routeIn.play();
    }
  }

  valuePositionHeaderChanged(e: any) {
    this.headerPosition = e;
  }
  valueCornerSizeChanged(e: any) {
    this.cornersSize = e.target.value;
  }
  valueBordersChanged(e: any) {
    this.cornersPosition = e;
  }
  valueBordersDisplay() {
    this.borders = !this.borders;
  }
  valueDisplayElement() {
    this.element = !this.element;
  }

  reloadItem() {
    this.headerPosition = 'left';
    this.cornersSize = 10;
    this.cornersPosition = 'out';
  }

  restartItem() {
    this.displayEl = false;
    setTimeout(() => this.displayEl = true, 50);
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
      if (this.mainDiv) {
        this.audioService.audio.routeOut.play();
      }
      this.mainDiv = false;
    }
  }
  // ************************* TEMPLATE CONDITIONS END *************************
}
