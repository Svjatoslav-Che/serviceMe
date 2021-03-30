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
      private actionService: ActionService
  ) {}

  ngOnInit(): void {
    this.audioService.loadSoundData();
    this.audioService.initSoundData();
    //loader conditions
    setTimeout(()=> {this.globalsService.loads = true;}, 3000);
    // this.globalsService.loads = true;
    this.checkCookies();
    this.detectDevice();
  }

  checkCookies() {
    if (this.tokenService.getToken() === 'local') {
      this.globalsService.userLogged = true;
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
    let parser = new UAParser().getResult();
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
