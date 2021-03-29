import { Component, OnInit, Input } from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import {fadeInUpOnEnterAnimation, fadeOutDownOnLeaveAnimation} from "angular-animations";

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
      public globalsService: GlobalsService
  ) { }

  ngOnInit() {
  }

  linkInGo() {
    window.open("https://www.linkedin.com/in/svjatoslav-cherednikov-7176011a1/", "_blank");
  }

  projectPageGo() {
    window.open("https://github.com/Svjatoslav-Che/serviceMe", "_blank");
  }

  popup(value) {
    this.globalsService.popupService = value;
  }

}
