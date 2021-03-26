import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import { environment } from '../../environments/environment'
import CookiesKey from './cookies-key.constant';

@Injectable()
export class TokenService {
  constructor(private cookieService: CookieService) {
  }

  public getToken(): string {
    return this.cookieService.get(CookiesKey.ACCESS_TOKEN);
  }

  public setLocalToken() {
    this.cookieService.put(CookiesKey.ACCESS_TOKEN, 'local');
  }

  // public getSupportToken(): string {
  //   return this.cookieService.get(CookiesKey.SUPPORT_TOKEN);
  // }

  // public destroySupportToken(): void {
  //   this.cookieService.remove(CookiesKey.SUPPORT_TOKEN);
  // }

  public destroyToken(): void {
    this.cookieService.remove(CookiesKey.ACCESS_TOKEN);
    // this.cookieService.remove(CookiesKey.SUPPORT_TOKEN);
  }

  // public setSupportToken(token: string): void {
  //   this.cookieService.put(CookiesKey.SUPPORT_TOKEN, token, 30, '/', environment.url);
  // }
}
