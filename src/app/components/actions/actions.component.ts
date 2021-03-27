import { Component, OnInit } from '@angular/core';
import { fadeInDownOnEnterAnimation, fadeOutUpOnLeaveAnimation } from 'angular-animations';
import { TranslateService } from '@ngx-translate/core';
import { AnimationEvent } from '@angular/animations';
import { AudioService } from '../../services/audio.service';
import { CommonService } from '../../services/common.service';
import { GlobalsService } from "../../services/globals.service";
import { LocalsService } from "../../services/local-storage.service";
import { environment } from "../../../environments/environment";
// import { DeleteComponent } from '../_popup/delete/delete.component';

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

export class ActionsComponent implements OnInit {
  public mainDiv: boolean;
  public displayedEvent: string = '';
  public currentDate = new Date();

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

  constructor(
      public translateService: TranslateService,
      public globalsService: GlobalsService,
      public audioService: AudioService,
      public localsService: LocalsService,
      private _data: CommonService,
      // private deleteComponent: DeleteComponent
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
    this._data.currentData.subscribe(currentData => this.toggleDiv(currentData));
    this.mainDiv = true;
    if (this.globalsService.firstAppear) {
      this.audioService.audio.routeIn.play();
    }
    this.initLang();
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
    this.paginationList = null;
  }

  scenarioTickets() {
    // abort pagination values
    this.reloadPagin();
    //go ticket scenario
    this.displayedEvent = 'tickets';
    // check tickets exist
    if (this.localsService.getAllStorageTickets() !== null) {
      this.ticketsList = this.localsService.getAllStorageTickets();
    } else {
      this.ticketsList = [];
    }
    this.displayTicketsList = this.ticketsList;
    //start pagination
    this.paginationModule(this.ticketsList);
  }

  async scenarioActions() {
    // abort pagination values
    this.reloadPagin();
    //go actions scenario
    this.displayedEvent = 'actions';
    this.displayActionList = await this.returner(this.globalsService.loggerData);
    this.paginationModule(this.displayActionList);
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
    if (value.length > 0) {
      this.numberOfPages = Math.ceil(value.length / 5)
    }

    this.paginationList = [];
    for (let i=0; i<5; i++) {
      let numOfElem = ((this.currentPage - 1) * 5) + i;
      if (value[numOfElem] !== undefined) {
        this.paginationList.push(value[numOfElem]);
      }
    }

    this.nextPage = this.numberOfPages > this.currentPage ? true : false;
    this.prevPage = this.currentPage > 1 ? true : false;
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
