import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';
import { AudioService } from '../../services/audio.service';
import { ActionService } from '../../services/action.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {

  constructor(
      public globalsService: GlobalsService,
      public audioService: AudioService,
      private actionService: ActionService
  ) {}

  ngOnInit(): void {
    this.actionService.actionGenerator(
        'system',
        'pop up service',
        'pop up service open',
        'pop up service open',
        'open'
    );
  }

  ngOnDestroy() {
    this.actionService.actionGenerator(
        'system',
        'pop up service',
        'pop up service close',
        'pop up service close',
        'close'
    );
  }

  missClickScenario() {
    this.actionService.actionGenerator(
        'user',
        'pop up service',
        'miss click',
        'miss click detected',
        this.globalsService.popupService
    );
    switch (this.globalsService.popupService) {
      case 'feedback': {
        this.globalsService.popupService = '';
        this.audioService.audio.smallOut.play();
        break
      }
      case 'cookies-policy': {
        this.globalsService.popupService = '';
        this.audioService.audio.smallOut.play();
        break
      }
      case 'delete-ticket': {
        this.globalsService.currentTicketNum = undefined;
        this.globalsService.currentTicket = undefined;
        this.globalsService.popupService = '';
        this.audioService.audio.smallOut.play();
        break
      }
      case 'watch-ticket': {
        this.globalsService.currentTicketNum = undefined;
        this.globalsService.currentTicket = undefined;
        this.globalsService.popupService = '';
        this.audioService.audio.smallOut.play();
        break
      }
    }
  }

}
