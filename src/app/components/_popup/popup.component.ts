import { Component, OnInit } from '@angular/core';
import { GlobalsService } from "../../services/globals.service";
import { AudioService } from "../../services/audio.service";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(
      public globalsService: GlobalsService,
      public audioService: AudioService
  ) { }

  ngOnInit(): void {
  }

  missClickScenario() {
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
