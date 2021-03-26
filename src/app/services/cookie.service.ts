import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import CookiesKey from "./cookies-key.constant";

@Injectable()
export class CookieService {
  private document: any;

  private documentIsAccessible: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (!isPlatformServer(platformId)) this.document = document;

    this.documentIsAccessible = this.document !== undefined;
  }

  public getPolicy(): string {
    return this.get(CookiesKey.POLICY_APPLY);
  }

  public setPolicy() {
    this.put(CookiesKey.POLICY_APPLY, 'confirmed');
  }

  public destroyPolicy() {
    this.remove(CookiesKey.POLICY_APPLY);
  }

  private getCookieRegExp(name): RegExp {
    // eslint-disable-next-line no-useless-escape
    const escapedName = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/ig, '\\$1');
    return new RegExp(`(?:^${escapedName}|;\\s*${escapedName})=(.*?)(?:;|$)`, 'g');
  }

  private check(name: string): boolean {
    if (!this.documentIsAccessible) {
      return false;
    }
    const definedName = encodeURIComponent(name);
    const regExp = this.getCookieRegExp(definedName);
    const exists = regExp.test(this.document.cookie);
    return exists;
  }

  public get(name: string): string {
    if (this.documentIsAccessible && this.check(name)) {
      const definedName = encodeURIComponent(name);
      const regExp = this.getCookieRegExp(definedName);
      const result = regExp.exec(this.document.cookie);
      return decodeURIComponent(result[1]);
    }

    return '';
  }

  public put(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean): void {
    if (!this.documentIsAccessible) return;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;
    if (expires) {
      if (typeof expires === 'number') {
        const dateExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
        cookieString += `expires=${dateExpires.toUTCString()};`;
      } else cookieString += `expires=${expires.toUTCString()};`;
    }
    if (path) cookieString += `path=${path};`;
    if (domain) cookieString += `domain=${domain};`;
    if (secure) cookieString += 'secure;';
    this.document.cookie = cookieString;
  }

  public remove(name: string, path?: string, domain?: string): void {
    if (!this.documentIsAccessible) {
      return;
    }
    this.put(name, '', -1, path, domain);
  }
}
