import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeInDownOnEnterAnimation, fadeOutUpOnLeaveAnimation } from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../services/audio.service';
import { CommonService } from '../../services/common.service';
import { GlobalsService } from '../../services/globals.service';
import { ActionService } from '../../services/action.service';
import { LocalsService } from '../../services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import {element} from "protractor";

const DURATION = { duration: 300 };

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss'],
  animations: [
    fadeInDownOnEnterAnimation(DURATION),
    fadeOutUpOnLeaveAnimation(DURATION)
  ]
})

export class AchievementComponent implements OnInit, OnDestroy {
  public mainDiv: boolean = false;
  public currentDate =  Date.parse(Date());

  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      public globalsService: GlobalsService,
      private actionService: ActionService,
      public localsService: LocalsService,
      public translateService: TranslateService,
  ) {}

  ngOnInit() {
    this._data.currentData.subscribe(currentData => this.toggleDiv(currentData));
    this.mainDiv = true;
    if (this.globalsService.firstAppear) {
      this.audioService.audio.routeIn.play();
    }
    this.actionService.actionGenerator(
        'system',
        'achieves page',
        'achieves page open',
        'achieves page open',
        'open'
    );
    this.getAchieve();
  }

  ngOnDestroy() {
    this.actionService.actionGenerator(
        'system',
        'achieves page',
        'achieves page close',
        'achieves page close',
        'close'
    );
  }

  getAchieve() {
    if (this.globalsService.newAchieve) {
      let i = 0;
      let achievesList = this.globalsService.achievesList.default.visit_page;
      achievesList.forEach(element => {
        if (element.state === 'solved' && element.achieve_seen_date === null) {
          if (confirm(element.name + ' solved, receive it?')) {
            achievesList[i].state = 'received';
            achievesList[i].achieve_seen_date =  Date.parse(Date());

            //CHECK CONDITION FOR visit all main pages ACHIEVE
            if (element.type === 'single main page') {
              achievesList[0].progress_value = achievesList[0].progress_value + 1;
            }
            this.localsService.updateAchievesList(this.globalsService.achievesList);
          }
        }
        i++;
      })
    }
    this.checkAchieve();
  }

  checkAchieve() {
    let achievesList = this.globalsService.achievesList.default;
    this.globalsService.newAchieve = false;
    achievesList.visit_page.forEach(element => {
      if (element.state === 'solved') {
        this.globalsService.newAchieve = true;
      }
    })

    if (achievesList.visit_page[0].progress_value === 5 && achievesList.visit_page[0].state === 'none') {
      this.globalsService.achievesList.default.visit_page[0].state = 'solved';
      this.globalsService.newAchieve = true;
      this.getAchieve();
    }
    if (achievesList.visit_page[0].state === 'received') {
      this.globalsService.achievesList.default.solved_visit_page = true;
      this.localsService.updateAchievesList(this.globalsService.achievesList);
    }
  }

  checkState(value) {
    let element = this.globalsService.achievesList.default.visit_page[value];
    switch (element.state) {
      case 'none': {
        return 'none';
      }
      case 'solved': {
        return 'solved';
      }
      case 'received': {
        return 'fresh';
      }
    }
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
    if (currentData.action === 'first route activate') {
      if (this.mainDiv) {
        this.audioService.audio.routeOut.play();
      }
      this.mainDiv = false;
    }
  }
  // ************************* TEMPLATE CONDITIONS END *************************
}
