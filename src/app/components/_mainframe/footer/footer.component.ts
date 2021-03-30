import { Component, OnInit, Input } from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import {fadeInUpOnEnterAnimation, fadeOutDownOnLeaveAnimation} from "angular-animations";
import { ActionService } from "../../../services/action.service";

const DURATION = {duration: 300};

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation(DURATION),
    fadeOutDownOnLeaveAnimation(DURATION)
  ]
})
export class FooterComponent implements OnInit {
  @Input() height: number;
  @Input() actionScene: number;

  constructor(
      public globalsService: GlobalsService,
      private actionService: ActionService
  ) { }

  ngOnInit() {
  }

  linkInGo() {
    this.actionService.actionGenerator(
        'user',
        'footer',
        'out link',
        'linked In link activated',
        'https://www.linkedin.com/in/svjatoslav-cherednikov-7176011a1/');

    window.open("https://www.linkedin.com/in/svjatoslav-cherednikov-7176011a1/", "_blank");
  }

  projectPageGo() {
    this.actionService.actionGenerator(
        'user',
        'footer',
        'out link',
        'GitHub link activated',
        'https://github.com/Svjatoslav-Che/serviceMe');

    window.open("https://github.com/Svjatoslav-Che/serviceMe", "_blank");
  }

  popup(value) {
    this.actionService.actionGenerator(
        'user',
        'footer',
        'popUp service',
        'Pop Up service called',
        value);

    this.globalsService.popupService = value;
  }

}
