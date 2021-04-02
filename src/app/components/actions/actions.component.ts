import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeInDownOnEnterAnimation, fadeOutUpOnLeaveAnimation } from 'angular-animations';
import { TranslateService } from '@ngx-translate/core';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../services/audio.service';
import { CommonService } from '../../services/common.service';
import { GlobalsService } from '../../services/globals.service';
import { LocalsService } from '../../services/local-storage.service';
import { environment } from '../../../environments/environment';
import { ActionService } from '../../services/action.service';
import { Router } from '@angular/router';

const DURATION = { duration: 300 };

@Component({
  selector: 'app-logger',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  animations: [
    fadeInDownOnEnterAnimation(DURATION),
    fadeOutUpOnLeaveAnimation(DURATION)
  ]
})

export class ActionsComponent implements OnInit, OnDestroy {
  public mainDiv: boolean;
  public displayedEvent: string = 'core';
  public currentDate = Date.parse(Date());
  // TICKETS
  private ticketsList: any;
  public displayTicketsList: any;
  public menuListTicketsType: any;
  public displayTicketType: string = 'all';
  public menuListDescriptionType: any;
  public displayDescriptionType: string = 'all';
  public menuListScreenshotsType: any;
  public displayScreenshotsType: string = 'all';
  public menuListDateType: any;
  public displayDateType: string = 'ascending';
  //ACTIONS
  public displayActionList: any;
  public menuListActionType: any;
  public displayActionType: string = 'all';
  //PAGINATION
  public prevPage: boolean = false;
  public nextPage: boolean = false;
  public numberOfPages: number = 0;
  public currentPage: number = 1;
  public paginationList: [];
  //MUTE VALUES
  public muteCoreClick: boolean = true;
  public muteTicketsClick: boolean = false;
  public muteActionsClick: boolean = false;

  constructor(
      public translateService: TranslateService,
      public globalsService: GlobalsService,
      public audioService: AudioService,
      public localsService: LocalsService,
      private _data: CommonService,
      private actionService: ActionService,
      private router: Router
  ) {
    this.menuListTicketsType = [
      { name: 'actions.all', value: 'all'},
      { name: 'actions.proposal', value: 'proposal'},
      { name: 'actions.error', value: 'error'},
      { name: 'actions.other', value: 'other'},
      { name: 'actions.undefined', value: ''},
    ]
    this.menuListDescriptionType = [
      { name: 'actions.all', value: 'all'},
      { name: 'actions.described', value: 'described'},
      { name: 'actions.empty', value: 'empty'},
    ]
    this.menuListScreenshotsType= [
      { name: 'actions.all', value: 'all'},
      { name: 'actions.screens', value: 'screens'},
      { name: 'actions.empty', value: 'empty'},
    ]
    this.menuListDateType = [
      { name: 'actions.ascending', value: 'ascending'},
      { name: 'actions.descending', value: 'descending'},
    ]
    this.menuListActionType = [
      { name: 'actions.all', value: 'all'},
      { name: 'actions.system', value: 'system'},
      { name: 'actions.user', value: 'user'},
    ]
    this.paginationList = [];
  }

  ngOnInit() {
    this._data.currentData.subscribe(currentData => this.dataRecognizer(currentData));
    this.mainDiv = true;
    if (this.globalsService.firstAppear) {
      this.audioService.audio.routeIn.play();
    }
    this.initLang();
    this.actionService.actionGenerator(
        'system',
        'actions page',
        'actions page open',
        'actions page open',
        'open'
    );
    if (this.globalsService.userLogged) {
      let achieve = this.globalsService.achievesList.default;
      if (achieve !== undefined && achieve.visit_page.visit_actions.state === 'none') {
        this.actionService.actionGenerator(
            'system',
            'actions page',
            'solve',
            'visit mainpage solved',
            'visit_actions'
        );
      }
    }
    if (this.globalsService.userLogged) {
      // this.audioService.audio.coreWorks.loop = true;
      // this.audioService.audio.coreWorks.play();
    }
  }

  ngOnDestroy() {
    this.actionService.actionGenerator(
        'system',
        'actions page',
        'actions page close',
        'actions page close',
        'close'
    );
    // this.audioService.audio.coreWorksHover.volume = 0;
    // this.audioService.audio.coreWorks.volume = 0;
  }

  // playInit() {
  //   this.audioService.audio.coreWorks.volume = this.globalsService.soundAmbient / 2;
  //   setTimeout(()=> this.audioService.audio.coreWorks.volume =this.globalsService.soundAmbient, 500 );
  //   this.audioService.audio.coreWorks.play();
  //   setTimeout(()=> this.audioService.audio.coreWorks.volume = this.globalsService.soundAmbient / 2, 9500 );
  //   setTimeout(()=> this.audioService.audio.coreWorks.volume = this.globalsService.soundAmbient / 4, 9700 );
  //   if (this.globalsService.userLogged) {
  //     setTimeout(()=> this.playMainTrack(), 9500 );
  //   };
  // }

  // playMainTrack() {
  //   this.audioService.audio.coreWorksHover.volume = this.globalsService.soundAmbient / 2;
  //   setTimeout(()=> this.audioService.audio.coreWorksHover.volume = this.globalsService.soundAmbient, 500 );
  //   this.audioService.audio.coreWorksHover.play();
  //   setTimeout(()=> this.audioService.audio.coreWorksHover.volume = this.globalsService.soundAmbient / 2, 9500 );
  //   setTimeout(()=> this.audioService.audio.coreWorksHover.volume = this.globalsService.soundAmbient / 4, 9700 );
  //   if (this.globalsService.userLogged) {
  //     setTimeout(()=> this.playInit(), 9500 )
  //   };
  // }

  generateMessage(value: string) {
    this.actionService.actionGenerator(
        'user',
        'actions page',
        'change view to: ' + value,
        'change view to: ' + value,
        value
    );
  }

  checkSwitch() {
    if (this.globalsService.userLogged) {
      return 'needlogin'
    }
  }

  initLang() {
    this.translateService.use(environment.defaultLocale);
  }

  reloadPagin() {
    this.prevPage = false;
    this.nextPage = false;
    this.numberOfPages = 1;
    this.currentPage = 1;
    this.paginationList = [];
  }

  muteConditions(value: string) {
  this.muteCoreClick = false;
  this.muteTicketsClick = false;
  this.muteActionsClick = false;

  switch (value) {
    case 'core': {
      this.muteCoreClick = true;
      break;
    }
    case 'tickets': {
      this.muteTicketsClick = true;
      break;
    }
    case 'actions': {
      this.muteActionsClick = true;
      break;
    }
  }
  }

  scenarioCore() {
    this.displayedEvent = 'core';
    this.generateMessage('core');
    this.muteConditions('core');
  }

  scenarioTickets() {
    // abort pagination values
    this.reloadPagin();
    //go ticket scenario
    this.displayedEvent = 'tickets';
    // check tickets exist
    if (this.localsService.getAllStorageTickets() !== null || this.localsService.getAllStorageTickets() !== []) {
      this.ticketsList = this.localsService.getAllStorageTickets();
    } else {
      this.ticketsList = [];
    }
    this.displayTicketsList = this.ticketsList;
    //start pagination
    this.paginationModule(this.ticketsList);
    this.generateMessage('tickets');
    this.muteConditions('tickets');
  }

  async scenarioActions() {
    // abort pagination values
    this.reloadPagin();
    //go actions scenario
    this.displayedEvent = 'actions';
    this.displayActionList = await this.returner(this.globalsService.loggerData);
    this.paginationModule(this.displayActionList);
    this.generateMessage('actions');
    this.muteConditions('actions');
  }

  async returner(value) {
    return value;
  }

  async sorterTicketType() {
    switch (this.displayTicketType) {
      case 'all':
        return this.displayTicketsList;
      case 'proposal':
        return this.displayTicketsList.filter(obj => obj.issue_state === 'proposal');
      case 'error':
        return this.displayTicketsList.filter(obj => obj.issue_state === 'error');
      case 'other':
        return this.displayTicketsList.filter(obj => obj.issue_state === 'other');
      case '':
        return this.displayTicketsList.filter(obj => obj.issue_state === '');
    }
  }

  async sorterActionType() {
    switch (this.displayActionType) {
      case 'all':
        return this.displayActionList;
      case 'user':
        return this.displayActionList.filter(obj => obj.subject === 'user');
      case 'system':
        return this.displayActionList.filter(obj => obj.subject === 'system');
    }
  }

  async sorterTicketDescription() {
    switch (this.displayDescriptionType) {
      case 'all':
        return this.displayTicketsList
      case 'described':
        return this.displayTicketsList.filter(obj => obj.description !== '');
      case 'empty':
        return this.displayTicketsList.filter(obj => obj.description === '');
    }
  }

  async sorterTicketScreenshots() {
    switch (this.displayScreenshotsType) {
      case 'all':
        return this.displayTicketsList
      case 'screens':
        return this.displayTicketsList.filter(obj => obj.screenshots.length > 0);
      case 'empty':
        return this.displayTicketsList.filter(obj => obj.screenshots.length === 0);
    }
  }

  async sorterTicketDate () {
    switch (this.displayDateType) {
      case 'ascending':
        return this.displayTicketsList.sort(function (a, b) {
          return new Date(a.date) < new Date(b.date) ? 1 : -1;
        });
      case 'descending':
        return this.displayTicketsList.sort(function (a, b) {
          return new Date(a.date) > new Date(b.date) ? 1 : -1;
        });
    }
  }

  removeTicket(value) {
    let currentCount: number;
    currentCount = ((this.currentPage - 1) * 5) + value;
    this.globalsService.popupService = 'delete-ticket';
    this.globalsService.currentTicketNum = currentCount;
    this.globalsService.currentTicket = this.localsService.getCurrentTicket(currentCount);
  }

  watchTicket(value) {
    let currentCount: number;
    currentCount = ((this.currentPage - 1) * 5) + value;
    this.globalsService.popupService = 'watch-ticket';
    this.globalsService.currentTicketNum = currentCount;
    this.globalsService.currentTicket = this.localsService.getCurrentTicket(currentCount);
  }

  nextPageClick() {
    this.currentPage++;
    switch (this.displayedEvent) {
      case 'tickets':
        return this.sorterTickets()
      case 'actions':
        return this.paginationModule(this.displayActionList)
    }
  }

  prevPageClick() {
    this.currentPage--;
    switch (this.displayedEvent) {
      case 'tickets':
        return this.sorterTickets()
      case 'actions':
        return this.paginationModule(this.displayActionList)
    }
  }

  paginationModule(value: []) {
    let numOfElements = 10;
    if (value) {
      if (value.length > 0) {
        this.numberOfPages = Math.ceil(value.length / numOfElements)
      }
      this.paginationList = [];
      for (let i=0; i<numOfElements; i++) {
        let numOfElem = ((this.currentPage - 1) * numOfElements) + i;
        if (value[numOfElem] !== undefined) {
          this.paginationList.push(value[numOfElem]);
        }
      }
      this.nextPage = this.numberOfPages > this.currentPage ? true : false;
      this.prevPage = this.currentPage > 1 ? true : false;
    }
  }

  async sorterActions() {
    this.displayActionList = await this.returner(this.globalsService.loggerData);
    this.displayActionList = await this.sorterActionType()
    this.paginationModule(this.displayActionList)
  }

  async sorterTickets() {
    this.displayTicketsList = await this.returner(this.ticketsList);
    this.displayTicketsList = await this.sorterTicketType();
    this.displayTicketsList = await this.sorterTicketDescription();
    this.displayTicketsList = await this.sorterTicketScreenshots();
    this.displayTicketsList = await this.sorterTicketDate().then(()=>
        this.paginationModule(this.displayTicketsList)
    );
  }

  valueActionsTypeChange(value) {
    this.currentPage = 1;
    this.displayActionType = value;
    this.sorterActions();
  }

  valueScreenshotsTypeChange(value) {
    this.currentPage = 1;
    this.displayScreenshotsType = value;
    this.sorterTickets();
  }

  valueDescriptionTypeChange(value) {
    this.currentPage = 1;
    this.displayDescriptionType = value;
    this.sorterTickets();
  }

  valueTicketTypeChange(value) {
    this.currentPage = 1;
    this.displayTicketType = value;
    this.sorterTickets();
  }

  valueDateTypeChange(value) {
    this.currentPage = 1;
    this.displayDateType = value;
    this.sorterTickets();
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

  dataRecognizer(currentData) {
    if (currentData.action === 'first route activate') {
      if (this.mainDiv) {
        this.audioService.audio.routeOut.play();
      }
      this.mainDiv = false;
    }

    if (this.displayedEvent === 'actions') {
      this.sorterActions();
    }

    if (this.displayedEvent === 'tickets') {
      if (currentData.location === 'feedback form' && currentData.params === 'send') {
        setTimeout(()=> this.scenarioTickets(),500);
      }
      if (currentData.location === 'delete form' && currentData.params === 'delete') {
        setTimeout(()=> this.scenarioTickets(),500);
      }
    }

    // if (currentData.action === 'change login scenario') {
    //   if (currentData.params === 'logged' && this.router.routerState.snapshot.url === '/actions') {
    //     this.playInit();
    //   }
    // }
  }
  // ************************* TEMPLATE CONDITIONS END *************************
  undefinded: Boolean | boolean;
}
