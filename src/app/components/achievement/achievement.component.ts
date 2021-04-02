import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeInDownOnEnterAnimation, fadeOutUpOnLeaveAnimation } from 'angular-animations';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../services/audio.service';
import { CommonService } from '../../services/common.service';
import { GlobalsService } from '../../services/globals.service';
import { ActionService } from '../../services/action.service';
import { LocalsService } from '../../services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';

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
  public achieveList: any;

  constructor(
      public audioService: AudioService,
      private _data: CommonService,
      public globalsService: GlobalsService,
      private actionService: ActionService,
      public localsService: LocalsService,
      public translateService: TranslateService,
  ) {}

  ngOnInit() {
    this._data.currentData.subscribe(currentData => this.checkAction(currentData));
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
    if (this.globalsService.userLogged) {
      this.generateAchievesList();

      let achieve = this.globalsService.achievesList.default;
      if (achieve !== undefined && achieve.visit_page.visit_achieves.state === 'none') {
        this.actionService.actionGenerator(
            'system',
            'achieves page',
            'solve',
            'visit mainpage solved',
            'visit_achieves'
        );
      }
    }
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

  generateAchievesList() {
    let achieveVisit = this.globalsService.achievesList.default.visit_page;
    this.achieveList = [
      achieveVisit.all_mainpages,
      achieveVisit.visit_home,
      achieveVisit.visit_about,
      achieveVisit.visit_sandbox,
      achieveVisit.visit_actions,
      achieveVisit.visit_achieves,
      achieveVisit.visit_404
    ]
  }

  checkSolid(value) {
    switch (value) {
      case 'progress': {
        return true;
      }
      case 'secret': {
        return true;
      }
    }
    return false;
  }

  checkVisibility(value) {
    if (value.type === 'secret' && value.state === 'none') {
      return false;
    } else {
      return true;
    }
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
  }

  receive(value) {
    this.globalsService.currentAchieve = value;
    this.globalsService.popupService = 'receive';
      this.globalsService.achievesList.default.visit_page[value.name].state = 'received';
      this.globalsService.achievesList.default.visit_page[value.name].date_receive = Date.parse(Date());
      this.localsService.updateAchievesList(this.globalsService.achievesList);
      this.generateAchievesList();
      this.checkAchievesToSeen();
  }

  checkAchievesToSeen() {
    let achievesList = this.localsService.getAllAchievesList().default;
    for (let element in achievesList.visit_page) {
      if (achievesList.visit_page[element].state === 'solve') {
        return this.globalsService.newAchieve = true;
      } else {
        this.globalsService.newAchieve = false;
      }
    }
  }

  checkState(value) {
    switch (value) {
      case 'none': {
        return 'none';
      }
      case 'solve': {
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

  checkAction(currentData) {
    if (currentData.action === 'first route activate') {
      if (this.mainDiv) {
        this.audioService.audio.routeOut.play();
      }
      this.mainDiv = false;
    }
    // if (currentData.description === 'apply receive' && currentData.action === 'receive') {
    //   this.generateAchievesList();
    // }
  }
  // ************************* TEMPLATE CONDITIONS END *************************
}
