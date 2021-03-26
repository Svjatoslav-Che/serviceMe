import {Component, OnInit, Input, ViewChildren, QueryList, AfterContentInit, Injectable} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { GlobalsService } from '../../../services/globals.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { fadeInDownOnEnterAnimation, fadeOutUpOnLeaveAnimation } from "angular-animations";
import { SquareHeaderComponent } from '../../_elements/header-square/square-header.component';
import { AudioService } from '../../../services/audio.service';
import { LocalsService } from '../../../services/local-storage.service';
import { AnimationEvent } from "@angular/animations";
import { TokenService } from '../../../services/token.service';

const DURATION = {duration: 300};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    fadeInDownOnEnterAnimation(DURATION),
    fadeOutUpOnLeaveAnimation(DURATION)
  ]
})

@Injectable()
export class HeaderComponent implements OnInit, ViewChildren, AfterContentInit {
  @ViewChildren(SquareHeaderComponent) child: QueryList<any>;
  @Input() height: number;
  @Input() actionScene: number;
  // public firstAppear: boolean = false;
  public displayVolumeValue: number;
  public displayColorValue: string;
  public displayBacgroundValue: string;
  //SELECTED MENU
  public languageOpen: boolean = false;
  public settingsOpen: boolean = false;
  public loginOpen: boolean = false;
  public selectService: boolean = true;
  public fistRoute: string = '';
  // SELECTED CURRENT LANGUAGE
  public selectedLanguage: string;
  languages: {id: string, title: string}[] = [];
  // ROUTES LIST
  public routeList: any;


  constructor(private translateService: TranslateService,
              public globalsService: GlobalsService,
              private router: Router,
              private route: ActivatedRoute,
              private _data: CommonService,
              public audioService: AudioService,
              private localsService: LocalsService,
              private tokenService: TokenService
              ) {
    this.routeList = [
      { class: 'main', name: 'header.main', route: '/' },
      { class: 'main', name: 'header.about', route: '/about' },
      { class: 'main', name: 'header.sandbox', route: '/sandbox' },
      { class: 'main', name: 'header.actions', route: '/actions' },
      { class: 'main', name: 'header.achives', route: '/achievement' },
    ]
  }

  descendants: boolean;
    emitDistinctChangesOnly: boolean;
    first: boolean;
    read: any;
    isViewQuery: boolean;
    selector: any;
    static?: boolean;

  ngOnInit(): void {
    this.checkDisplayValues();
    this.checkLang();
    this.initLang();
    this.displayVolumeValue = this.globalsService.soundVol;
    this._data.currentData.subscribe(currentData => this.dataRecognizer(currentData));
  }

  ngAfterContentInit() {
  }

  localScenarioToggle() {
    if (this.globalsService.cookiesPolicy) {
      if (this.globalsService.userLogged) {
        this.globalsService.userLogged = false;
        this.tokenService.destroyToken();
        this.audioService.audio.logOut.play();
      } else {
        this.globalsService.userLogged = true;
        this.tokenService.setLocalToken();
        this.audioService.audio.logIn.play();
      }
    } else {
      this.globalsService.popupService = 'cookies-policy'
    }

    this.selectServiceToggle('login_close');
  }

  checkDisplayValues() {
    // COLOR CHANGE CONDITIONS
    if (this.globalsService.colorSettings === 'color_scheme_green') {
      this.displayColorValue = 'matrix'
    }
    if (this.globalsService.colorSettings === 'color_scheme_blue') {
      this.displayColorValue = 'sky'
    }
    if (this.globalsService.colorSettings === 'color_scheme_pink') {
      this.displayColorValue = 'pink'
    }
    // BACKGROUND CHANGE CONDITIONS
    if (this.globalsService.backgroundSettings === 'full') {
      this.displayBacgroundValue = 'active'
    }
    if (this.globalsService.backgroundSettings === 'picture') {
      this.displayBacgroundValue = 'static'
    }
    if (this.globalsService.backgroundSettings === 'potato') {
      this.displayBacgroundValue = 'potato'
    }
  }

  backgroundToggle(value) {
    if (this.globalsService.backgroundSettings !== value)  {
      this.audioService.audio.applySND.play();
      this.globalsService.backgroundSettings = value;
      this.localsService.set('background', value);
      this.checkDisplayValues();
      this._data.updateMessage({
        subject: 'user',
        location: 'header',
        action: 'background change',
        description: 'set new background',
        params: value,
        date: Date()
      });
    }
  }

  colorShemeToggle(value) {
    if (this.globalsService.colorSettings !== value) {
      this.audioService.audio.applySND.play();
      this.globalsService.colorSettings = value;
      this.localsService.set('colorScheme', value);
      this.checkDisplayValues();
      this._data.updateMessage({
        subject: 'user',
        location: 'header',
        action: 'colors change',
        description: 'set new colors',
        params: value,
        date: Date()
      });
    }
  }

  valueSoundChanged(e: any) {

    this.globalsService.soundVol = Math.floor(e.target.value);
    this.audioService.initSoundData();
    this.localsService.set('soundVol', Math.floor(e.target.value));
    this._data.updateMessage({
      subject: 'user',
      location: 'header',
      action: 'volume change',
      description: 'set new volume',
      params: Math.floor(e.target.value),
      date: Date()
    });
    this.audioService.audio.applySND.play();
  }

  valueSoundDisplay(e: any) {
    this.displayVolumeValue =  Math.floor(e.target.value);
  }

  selectServiceToggle(value) {
    let duration: number = 80;

    // LANGUAGE BUTTON CONDITIONS
      if (value === 'lang') {
        this.languageOpen ? this.audioService.audio.smallOut.play() : this.audioService.audio.smallIn.play();
        this.selectService = false;
        if (this.settingsOpen || this.loginOpen) {
          duration = 160;
        }
        setTimeout(()=> {
          this.languageOpen = !this.languageOpen;
          this.selectService = true;
        }, duration);
        this._data.updateMessage({
          subject: 'user',
          location: 'header',
          action: this.languageOpen ? 'language close' : 'language open',
          description: this.languageOpen ? 'language panel close' : 'language panel open',
          params: value,
          date: Date()
        });
      }
      if (value === 'lang_close' && this.languageOpen && !this.settingsOpen && !this.loginOpen) {
        this.audioService.audio.smallOut.play();
        this.selectService = false;
        setTimeout(()=> {
          this.languageOpen = false;
          this.selectService = true;
        }, 80);
        this._data.updateMessage({
          subject: 'user',
          location: 'header',
          action: 'language close',
          description: 'language panel close',
          params: value,
          date: Date()
        });
      }

    // SETTINGS BUTTON CONDITIONS
      if (value === 'settings') {
        this.settingsOpen ? this.audioService.audio.smallOut.play() : this.audioService.audio.smallIn.play();
        this.selectService = false;
        if (this.languageOpen || this.loginOpen) {
          duration = 160;
        }
        setTimeout(()=> {
          this.settingsOpen = !this.settingsOpen;
          this.selectService = true;
        }, duration);
        this._data.updateMessage({
          subject: 'user',
          location: 'header',
          action: this.settingsOpen ? 'settings close' : 'settings open',
          description: this.settingsOpen ? 'settings panel close' : 'settings panel open',
          params: value,
          date: Date()
        });
      }

      if (value === 'settings_close' && this.settingsOpen && !this.languageOpen && !this.loginOpen) {
        this.audioService.audio.smallOut.play();
        this.selectService = false;
        setTimeout(()=> {
          this.settingsOpen = false;
          this.selectService = true;
        }, 80);
        this._data.updateMessage({
          subject: 'user',
          location: 'header',
          action: 'settings close',
          description: 'settings panel close',
          params: value,
          date: Date()
        });
      }

    // LOGIN BUTTON CONDITIONS
    if (value === 'login') {
      this.loginOpen ? this.audioService.audio.smallOut.play() : this.audioService.audio.smallIn.play();
      this.selectService = false;
      if (this.languageOpen || this.settingsOpen) {
        duration = 160;
      }
      setTimeout(()=> {
        this.loginOpen = !this.loginOpen;
        this.selectService = true;
      }, duration);
      this._data.updateMessage({
        subject: 'user',
        location: 'header',
        action: this.loginOpen ? 'login close' : 'login open',
        description: this.loginOpen ? 'login panel close' : 'login panel open',
        params: value,
        date: Date()
      });
    }

    if (value === 'login_close' && this.loginOpen && !this.languageOpen && !this.settingsOpen) {
      this.audioService.audio.smallOut.play();
      this.selectService = false;
      setTimeout(()=> {
        this.loginOpen = false;
        this.selectService = true;
      }, 80);
      this._data.updateMessage({
        subject: 'user',
        location: 'header',
        action: 'login close',
        description: 'login panel close',
        params: value,
        date: Date()
      });
    }
  }

  changeLang(value) {
    this.selectedLanguage = value;
    environment.defaultLocale = value;
    this.translateService.use(this.selectedLanguage);
    this.selectServiceToggle('lang');
    this.localsService.set('language', value);
    this._data.updateMessage({
      subject: 'user',
      location: 'header',
      action: 'language change',
      description: 'set new language',
      params: value,
      date: Date()
    });
    this.audioService.audio.applySND.play();
  }

  initLang() {
    this.translateService.use(environment.defaultLocale);
    this.selectedLanguage = environment.defaultLocale;
    this.translateService.get(environment.locales.map(x => `LANGUAGES.${x.toUpperCase()}`))
        .subscribe(translations => {
          // init dropdown list with TRANSLATED list of languages from config
          this.languages = environment.locales.map(x => {
            return {
              id: x,
              title: translations[`LANGUAGES.${x.toUpperCase()}`],
            };
          });
        });
  }

  checkLang() {
    let language = this.localsService.get('language');
    if (language != undefined) {
      this.selectedLanguage = language;
      environment.defaultLocale = language;
    } else {
      this.selectedLanguage = 'en';
    }
  }

  remoteRouterScenario(value) {
    if (this.router.routerState.snapshot.url !== value && value !== this.fistRoute) {
      this._data.updateMessage({
        subject: 'user',
        location: 'header',
        action: 'first route activate',
        description: 'remote first route activated',
        params: value,
        date: Date()
      });
    }
  }

  routerScenario(value) {
      this.fistRoute = value;
      setTimeout(() => {this.router.navigate([value])}, 300);
  }

  routeFirstChildCheck(): any {
    this.fistRoute = this.router.routerState.snapshot.url;
    if (this.router.routerState.snapshot.url.slice(0, 8) === '/sandbox') {
      this.fistRoute = this.router.routerState.snapshot.url.slice(0, 8);
    }
  }

  dataRecognizer(value) {
    if (value.action === 'first route activate') {
      this.routerScenario(value.params);
    }
  }

  animInStart(event: AnimationEvent) {
  }

  animInDone(event: AnimationEvent) {
    if (!this.globalsService.firstAppear) {
      this.routeFirstChildCheck()
      this.globalsService.firstAppear = true;
    }
  }
}
