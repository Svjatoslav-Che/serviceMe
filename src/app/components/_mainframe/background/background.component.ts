import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation
} from 'angular-animations';

const DURATION = { duration: 300 };

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  animations: [
    fadeInOnEnterAnimation(DURATION),
    fadeOutOnLeaveAnimation(DURATION)
  ]
})
export class BackgroundComponent implements OnInit {

  constructor(
      public globalsService: GlobalsService
  ) { }

  ngOnInit() {
  }

}
