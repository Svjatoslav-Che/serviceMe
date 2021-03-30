import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { LocalsService } from '../../../services/local-storage.service';
import { AudioService } from '../../../services/audio.service';
import { CookieService } from '../../../services/cookie.service';
import { TokenService } from '../../../services/token.service';
import { ActionService } from '../../../services/action.service';

@Component({
  selector: 'app-cookies-policy',
  templateUrl: './cookies-policy.component.html',
  styleUrls: ['./cookies-policy.component.scss']
})
export class CookiesPolicyComponent implements OnInit, OnDestroy {
  @ViewChild('sizeViewer') sizeViewer: ElementRef;
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription

  public cornersSize: number = 10;
  public cornersPosition: string = 'out';
  public borders: boolean = true;
  public elementOrient: string = 'left';
  public element: string;
  public header: string = 'COOKIES';
  public description: string = 'already applied';

  constructor(
      public globalsService: GlobalsService,
      private localsService: LocalsService,
      public audioService: AudioService,
      private cookieService: CookieService,
      private tokenService: TokenService,
      private actionService: ActionService
  ) { }

  ngOnInit(): void {
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
        'cookies policy',
        'cookies policy open',
        'cookies policy open',
        'open'
    );
  }

  ngOnDestroy() {
    this.actionService.actionGenerator(
        'system',
        'cookies policy',
        'cookies policy close',
        'cookies policy close',
        'close'
    );
  }

  getSize() {
    let width = this.sizeViewer.nativeElement.offsetWidth;
    if (width < 331) {
      this.elementOrient = 'centre';
      this.actionService.actionGenerator(
          'system',
          'cookies policy',
          'element position change',
          'element position change with autosize detection',
          this.elementOrient
      );
    } else {
      this.elementOrient = 'left';
      this.actionService.actionGenerator(
          'system',
          'cookies policy',
          'element position change',
          'element position change with autosize detection',
          this.elementOrient
      );
    }
  }

  applyCookies() {
    this.actionService.actionGenerator(
        'user',
        'cookies policy',
        'button click',
        'apply cookies policy',
        this.globalsService.cookiesPolicy ? 'true' : 'false'
    );
    this.cookieService.setPolicy();
    this.globalsService.cookiesPolicy = true;
    this.globalsService.popupService = '';
  }

  closeCookies() {
    this.globalsService.popupService = '';
    this.actionService.actionGenerator(
        'user',
        'cookies policy',
        'button click',
        'auto Pop Up close after action',
        this.globalsService.popupService
    );
  }

  destroyCookies() {
    this.actionService.actionGenerator(
        'user',
        'cookies policy',
        'destroy policy',
        'destroy policy action',
        this.globalsService.popupService
    );
    if (this.globalsService.userLogged) {
      this.audioService.audio.logOut.play()
    }
    this.cookieService.destroyPolicy();
    this.tokenService.destroyToken();
    this.actionService.actionGenerator(
        'system',
        'cookies policy',
        'destroy token',
        'destroy token action',
        this.globalsService.popupService
    );
    this.globalsService.cookiesPolicy = false;
    this.actionService.actionGenerator(
        'system',
        'cookies policy',
        'set cookies policy',
        'set cookies policy state to new value',
        this.globalsService.cookiesPolicy ? 'true' : 'false'
    );
    this.globalsService.userLogged = false;
    this.actionService.actionGenerator(
        'system',
        'cookies policy',
        'set login',
        'set login state to new value',
        this.globalsService.userLogged ? 'true' : 'false'
    );
    this.globalsService.popupService = '';
  }
}


