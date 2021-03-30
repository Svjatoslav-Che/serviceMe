import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import { environment } from '../../environments/environment'
import CookiesKey from './cookies-key.constant';
import { ActionService } from "./action.service";

@Injectable()
export class TokenService {
  constructor(
      private cookieService: CookieService,
      private actionService: ActionService
  ) {}

  public getToken(): string {
    return this.cookieService.get(CookiesKey.ACCESS_TOKEN);
  }

  public setLocalToken() {
    this.cookieService.put(CookiesKey.ACCESS_TOKEN, 'local');
    this.actionService.actionGenerator(
        'system',
        'token service',
        'set token',
        'set token',
        'local'
    );
  }

  // public getSupportToken(): string {
  //   return this.cookieService.get(CookiesKey.SUPPORT_TOKEN);
  // }

  // public destroySupportToken(): void {
  //   this.cookieService.remove(CookiesKey.SUPPORT_TOKEN);
  // }

  public destroyToken(): void {
    this.cookieService.remove(CookiesKey.ACCESS_TOKEN);
    this.actionService.actionGenerator(
        'system',
        'token service',
        'destroy token',
        'destroy token',
        'none'
    );
    // this.cookieService.remove(CookiesKey.SUPPORT_TOKEN);
  }

  // public setSupportToken(token: string): void {
  //   this.cookieService.put(CookiesKey.SUPPORT_TOKEN, token, 30, '/', environment.url);
  // }
}
