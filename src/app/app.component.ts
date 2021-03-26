import {Component, OnInit, HostListener} from '@angular/core';
import { AudioService} from './services/audio.service';
import { TokenService } from './services/token.service';
import { CookieService } from './services/cookie.service';
import CookiesKey from './services/cookies-key.constant';
import { GlobalsService } from './services/globals.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CommonService } from "./services/common.service";
import { BigGraphComponent } from "./components/_elements/big-graph/big-graph.component";
import { UAParser } from 'ua-parser-js';

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
      private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.audioService.initSoundData();
    this.checkCookies();
    this.detectDevice();
  }

  checkCookies() {
    if (this.tokenService.getToken() === 'local') {
      this.globalsService.userLogged = true;
    } else {
      this.globalsService.userLogged = false;
    }
    if (this.cookieService.getPolicy()) {
      this.globalsService.cookiesPolicy = true;
    } else {
      this.globalsService.cookiesPolicy = false;
      setTimeout(()=> {this.globalsService.popupService = 'cookies-policy';}, 0)
    }
  }

  detectDevice() {
    let parser = new UAParser().getResult();

    if (this.globalsService.deviceInfo === undefined) {
      this._data.updateMessage({
        subject: 'system',
        location: 'app',
        action: 'device type change',
        description: 'first device type detection',
        params: parser.device.type,
        date: Date()
      });
      this.globalsService.deviceInfo = parser;
    } else {
      if (parser.device.type !== this.globalsService.deviceInfo.device.type) {
        this._data.updateMessage({
          subject: 'system',
          location: 'app',
          action: 'device type change',
          description: 'device type change',
          params: parser.device.type,
          date: Date()
        });
        this.globalsService.deviceInfo = parser;
      }
    }
    this.bigGraph.updateDeviceDescription();
  }
}
