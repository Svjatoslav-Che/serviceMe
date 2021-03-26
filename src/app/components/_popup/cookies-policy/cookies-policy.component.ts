import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalsService } from "../../../services/globals.service";
import { Observable, Subscription, fromEvent } from "rxjs";
import { LocalsService } from "../../../services/local-storage.service";
import { AudioService } from '../../../services/audio.service';
import { CookieService } from '../../../services/cookie.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-cookies-policy',
  templateUrl: './cookies-policy.component.html',
  styleUrls: ['./cookies-policy.component.scss']
})
export class CookiesPolicyComponent implements OnInit {
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
  }

  getSize() {
    let width = this.sizeViewer.nativeElement.offsetWidth;
    if (width < 331) {
      this.elementOrient = 'centre';
    } else {
      this.elementOrient = 'left';
    }
  }

  checkPolicity() {
    // this.cookieService.getPolicy()
  }

  applyCookies() {
    this.cookieService.setPolicy();
    this.globalsService.cookiesPolicy = true;
    this.globalsService.popupService = '';
  }

  closeCookies() {
    this.globalsService.popupService = '';
  }

  destroyCookies() {
    if (this.globalsService.userLogged) {
      this.audioService.audio.logOut.play()
    }
    this.cookieService.destroyPolicy();
    this.tokenService.destroyToken();
    this.globalsService.cookiesPolicy = false;
    this.globalsService.userLogged = false;
    this.globalsService.popupService = '';
  }


}


