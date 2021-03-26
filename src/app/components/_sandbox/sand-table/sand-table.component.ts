import { Component, OnInit } from '@angular/core';
import { fadeInRightOnEnterAnimation, fadeOutRightOnLeaveAnimation } from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../../services/audio.service';
import { CommonService } from '../../../services/common.service';
import { GlobalsService } from '../../../services/globals.service';

const DURATION = { duration: 300 };
const CURSORSYMBOL: string = '▊';

@Component({
  selector: 'app-sand-table',
  templateUrl: './sand-table.component.html',
  styleUrls: ['./sand-table.component.scss'],
  animations: [
    fadeInRightOnEnterAnimation(DURATION),
    fadeOutRightOnLeaveAnimation(DURATION)
  ]
})
export class SandTableComponent implements OnInit {
  // *************************** TEMPLATE CONDITIONS ***************************
  public mainDiv: boolean;
  // ************************* TEMPLATE CONDITIONS END *************************

  public innerTableData: any;

  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      public globalsService: GlobalsService,
  ) {
    this.innerTableData = [
      { subject: 'sandbox.table_sheet.subject_t', location: 'sandbox.table_sheet.location_t', action: 'sandbox.table_sheet.action_t' },
      { subject: 'sandbox.table_sheet.subject_t', location: 'sandbox.table_sheet.location_t', action: 'sandbox.table_sheet.action_t' },
      { subject: 'sandbox.table_sheet.subject_t', location: 'sandbox.table_sheet.location_t', action: 'sandbox.table_sheet.action_t' },
      { subject: 'sandbox.table_sheet.subject_t', location: 'sandbox.table_sheet.location_t', action: 'sandbox.table_sheet.action_t' },
      { subject: 'sandbox.table_sheet.subject_t', location: 'sandbox.table_sheet.location_t', action: 'sandbox.table_sheet.action_t' },
      { subject: 'sandbox.table_sheet.subject_t', location: 'sandbox.table_sheet.location_t', action: 'sandbox.table_sheet.action_t' },
      { subject: 'sandbox.table_sheet.subject_t', location: 'sandbox.table_sheet.location_t', action: 'sandbox.table_sheet.action_t' },
      { subject: 'sandbox.table_sheet.subject_t', location: 'sandbox.table_sheet.location_t', action: 'sandbox.table_sheet.action_t' },
      { subject: 'sandbox.table_sheet.subject_t', location: 'sandbox.table_sheet.location_t', action: 'sandbox.table_sheet.action_t' },
      { subject: 'sandbox.table_sheet.subject_t', location: 'sandbox.table_sheet.location_t', action: 'sandbox.table_sheet.action_t' },
      { subject: 'sandbox.table_sheet.subject_t', location: 'sandbox.table_sheet.location_t', action: 'sandbox.table_sheet.action_t' },
      { subject: 'sandbox.table_sheet.subject_t', location: 'sandbox.table_sheet.location_t', action: 'sandbox.table_sheet.action_t' },
    ]
  }

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
      this.mainDiv = !this.mainDiv;
      this.audioService.audio.routeOut.play();
    }
  }
  // ************************* TEMPLATE CONDITIONS END *************************
}

