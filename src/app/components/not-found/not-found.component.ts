import { Component, OnInit, OnDestroy } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { CommonService } from '../../services/common.service';
import { ActionService } from '../../services/action.service';
import { GlobalsService } from '../../services/globals.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  constructor(
      private audioService: AudioService,
      private _data: CommonService,
      private actionService: ActionService,
      public globalsService: GlobalsService
  ) { }

  ngOnInit() {
    this.actionService.actionGenerator(
        'system',
        '404 page',
        '404 page open',
        '404 page open',
        'open'
    );
    if (this.globalsService.userLogged) {
      let achieve = this.globalsService.achievesList.default;
      if (achieve !== undefined && achieve.visit_page.visit_404.state === 'none' && this.globalsService.userLogged) {
        this.actionService.actionGenerator(
            'system',
            '404 page',
            'solve',
            'visit mainpage solved',
            'visit_404'
        );
      }
    }
  }

  ngOnDestroy() {
    this.actionService.actionGenerator(
        'system',
        '404 page',
        '404 page close',
        '404 page close',
        'close'
    );
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
      params: value
    });
  }
}
