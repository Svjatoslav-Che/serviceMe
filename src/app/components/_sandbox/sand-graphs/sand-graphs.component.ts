import { Component, OnInit } from '@angular/core';
import {fadeInRightOnEnterAnimation, fadeOutRightBigAnimation, fadeOutRightOnLeaveAnimation} from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../../services/audio.service';
import { CommonService } from '../../../services/common.service';
import { BigGraphComponent } from "../../_elements/big-graph/big-graph.component";
import {GlobalsService} from "../../../services/globals.service";

const DURATION = { duration: 300 };

@Component({
  selector: 'app-sand-graphs',
  templateUrl: './sand-graphs.component.html',
  styleUrls: ['./sand-graphs.component.scss'],
  animations: [
    fadeInRightOnEnterAnimation(DURATION),
    fadeOutRightOnLeaveAnimation(DURATION),
    fadeOutRightBigAnimation(DURATION)
  ]
})
export class SandGraphsComponent implements OnInit {
  // *************************** TEMPLATE CONDITIONS ***************************
  public mainDiv: boolean;
  // ************************* TEMPLATE CONDITIONS END *************************

  public size: number = 200;
  public cornersPosition: string = 'out';
  public borders: boolean = true;
  public displayEl: boolean = true;
  public element: boolean = true;

  public menuListDraws: any;
  public displayDraw: string = 'Keanu';

  public drawSpeedObj = {duration: 50};

  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      private bigDraw: BigGraphComponent,
      public globalsService: GlobalsService,
  ) {
    this.menuListDraws = [
      { name: 'sandbox.elements_graphs.Keanu', value: 'Keanu'},
      { name: 'sandbox.elements_graphs.Hulk', value: 'Hulk'},
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

  valueDisplayElement() {
    this.element = !this.element;
  }

  restartItem() {
    this.bigDraw.redraw();
  }

  resetItem() {
    this.displayEl = false;
    setTimeout(() => this.displayEl = true, 50);
    this.size = 200;
    this.cornersPosition = 'out';
    this.borders = true;
    this.element = true
  }

  valueDisplayerChange(value) {
    this.displayDraw = value;
  }

  valueSoundChanged() {
    this.audioService.audio.applySND.play();
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
