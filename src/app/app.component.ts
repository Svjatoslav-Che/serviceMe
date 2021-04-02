import {Component, OnInit, HostListener} from '@angular/core';
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @HostListener('window:resize', ['$event'])

  onResize(event) {
    this.detectDevice();
  }

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
    this.audioService.loadSoundData();
    this.audioService.initSoundData();
    //loader conditions
    // setTimeout(()=> {this.globalsService.loads = true;}, 3000);
    this.globalsService.loads = true;
    this.checkCookies();
    this.detectDevice();
    this.initAchives();
    this.checkAchievesToSeen()
  }

  checkAchievesToSeen() {
    if (this.localsService.getAllAchievesList() !== null) {
      let achievesList = this.localsService.getAllAchievesList();
      // achievesList.default.visit_page.forEach(element => {
      //   if (element.state === 'solved') {
      //     this.globalsService.newAchieve = true;
      //     this.audioService.audio.msg.play();
      //   }
      // })
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
