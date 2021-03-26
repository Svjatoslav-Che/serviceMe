import { Component, OnInit } from '@angular/core';
import { AudioService } from "../../services/audio.service";
import { CommonService } from "../../services/common.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
      private audioService: AudioService,
      private _data: CommonService,
  ) { }

  ngOnInit() {
  }

  hoverSound() {
    this.audioService.audio.selectSND.play();
  }

  clickSound() {
    this.audioService.audio.clickSND.play();
  }

  remoteRouterScenario(value) {
    this.clickSound();
    this._data.updateMessage({
      subject: 'user',
      location: 'sandbox bootstrap',
      action: 'first route activate',
      description: 'remote first route activated',
      params: value,
      date: Date()
    });
  }

}
