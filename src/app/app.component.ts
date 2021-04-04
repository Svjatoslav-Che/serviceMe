import {Component, OnInit, HostListener, ViewChild, ElementRef} from '@angular/core';
import { AudioService} from './services/audio.service';
import { TokenService } from './services/token.service';
import { CookieService } from './services/cookie.service';
import { GlobalsService } from './services/globals.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CommonService } from './services/common.service';
import { BigGraphComponent } from './components/_elements/big-graph/big-graph.component';
import { UAParser } from 'ua-parser-js';
import { LocalsService } from './services/local-storage.service';
import { ActionService } from './services/action.service';
import {fromEvent, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChild('sizeViewer') sizeViewer: ElementRef
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription
  @HostListener('window:resize', ['$event'])

  onResize(event) {
    this.detectDevice();
  }

  public innerOutletHeight: number = 100;

  constructor(
      private cookieService: CookieService,
      public globalsService: GlobalsService,
      public audioService: AudioService,
      private deviceService: DeviceDetectorService,
      private bigGraph: BigGraphComponent,
      private _data: CommonService,
      private tokenService: TokenService,
      private actionService: ActionService,
      private localsService: LocalsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getSize();
    }, 0);
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( event => {
      this.getSize();
    })

    this.audioService.loadSoundData();
    this.audioService.initSoundData();
    //loader conditions
    // setTimeout(()=> {this.globalsService.loads = true;}, 3000);
    this.globalsService.loads = true;
    this.checkCookies();
    this.detectDevice();
    this.initAchives();
    this.checkAchievesToSeen();

    setTimeout(() => {
      this.getSize();
    }, 0);
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( event => {
      this.getSize();
    })
    this.audioService.audio.type.play();
    this.actionService.actionGenerator(
        'system',
        'delete form',
        'delete form open',
        'delete form open',
        'open'
    );
  }

  getSize() {
    let width = this.sizeViewer.nativeElement.offsetWidth;
    let height = this.sizeViewer.nativeElement.offsetHeight;
    // full size
    if (width > 850) {
      // header:96 footer:51 steps:11 (2 times) corrector:1
      this.innerOutletHeight = height - 96 - 51 - 11 - 11 + 1;
    }
    // mid
    if (width <= 850 &&  width > 650) {
      // header:65 footer:41 steps:11 (2 times) corrector:1
      this.innerOutletHeight = height - 65 - 41 - 11 - 11 + 1;
    }
    // extrasmall
    if (width <= 650) {
      // header:41 footer:41 steps:11 (2 times) corrector:1
      this.innerOutletHeight = height - 41 - 41 - 11 - 11 + 1;
    }
  }

  checkAchievesToSeen() {
    if (this.localsService.getAllAchievesList() === null) {
      return this.initAchives();
    }
    let achievesList = this.localsService.getAllAchievesList().default;
    for (let element in achievesList.visit_page) {
      if (achievesList.visit_page[element].state === 'solve') {
        this.audioService.audio.msg.play();
        return this.globalsService.newAchieve = true;
      } else {
        this.globalsService.newAchieve = false;
      }
    }
  }

  initAchives() {
    if (this.localsService.getAllAchievesList() !== null) {
      if (this.localsService.checkValidateAchieves()) {
        this.globalsService.achievesList = this.localsService.getAllAchievesList();
        this.actionService.actionGenerator(
            'system',
            'header',
            'get achieves',
            'get achieves',
            'get'
        );
      } else {
        this.createAchieves();
      }
    } else {
      this.createAchieves();
    }
  }

  createAchieves() {
    this.localsService.createAchievesList();
    this.globalsService.achievesList = this.localsService.getAllAchievesList();
    this.actionService.actionGenerator(
        'system',
        'header',
        'create achieves',
        'create achieves list',
        'create'
    );
  }

  checkCookies() {
    if (this.tokenService.getToken() === 'local') {
      this.globalsService.userLogged = true;
      this.checkAchievesToSeen();
    } else {
      this.globalsService.userLogged = false;
    }
    this.actionService.actionGenerator(
        'system',
        'app',
        'check cookie',
        'check cookie',
        this.tokenService.getToken() === 'local' ? 'local' : 'undefined');

    this.actionService.actionGenerator(
        'system',
        'app',
        'check login',
        'check and set login value',
        this.globalsService.userLogged);

    if (this.cookieService.getPolicy()) {
      this.globalsService.cookiesPolicy = true;
    } else {
      this.globalsService.cookiesPolicy = false;
      setTimeout(()=> {this.globalsService.popupService = 'cookies-policy';}, 0)
    }

    this.actionService.actionGenerator(
        'system',
        'app',
        'check policy',
        'check and set cookies policy value',
        this.globalsService.cookiesPolicy);
  }

  detectDevice() {
    /*eslint-disable */
    let parser = new UAParser().getResult();
    /*eslint-enable */
    if (parser === undefined) {
      setTimeout(()=> this.detectDevice(), 50)
    } else {
      if (this.globalsService.deviceInfo === undefined) {
        this.actionService.actionGenerator(
            'system',
            'app',
            'device type check',
            'device type check scenario',
            'undefined');

        this.globalsService.deviceInfo = parser;
      } else {
        if (parser.device.type !== this.globalsService.deviceInfo.device.type) {
          this.actionService.actionGenerator(
              'system',
              'app',
              'device type check',
              'device type check scenario',
              parser.device.type);

          this.globalsService.deviceInfo = parser;
        }
      }
      this.bigGraph.updateDeviceDescription();
    }
  }
}
