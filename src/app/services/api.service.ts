import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable} from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  private isServer: boolean;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isServer = isPlatformServer(platformId);
  }

  // private setHeaders(): HttpHeaders {
  //   const headersFields: any = {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   };
  //   if (this.tokenService.getToken()) {
  //     headersFields.Authorization = `Bearer ${this.tokenService.getToken()}`;
  //   }
  //   return new HttpHeaders(headersFields);
  // }
  //
  // public get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
  //   const url = this.isServer ? environment.ssr_api_url : environment.api_url;
  //   return this.http.get<T>(`${url}${path}`, { headers: this.setHeaders(), params });
  // }
  //
  // public put<T>(path: string, body: Object = {}): Observable<T> {
  //   const url = this.isServer ? environment.ssr_api_url : environment.api_url;
  //   return this.http.put<T>(`${url}${path}`, JSON.stringify(body), { headers: this.setHeaders() });
  // }
  //
  // public post<T>(path: string, body: Object = {}): Observable<T> {
  //   const url = this.isServer ? environment.ssr_api_url : environment.api_url;
  //   return this.http.post<T>(`${url}${path}`, JSON.stringify(body), { headers: this.setHeaders() });
  // }
  //
  // public delete(path: string): Observable<any> {
  //   const url = this.isServer ? environment.ssr_api_url : environment.api_url;
  //   return this.http.delete(`${url}${path}`, { headers: this.setHeaders() });
  // }

  // public upload<T>(path: string, body: object = {}): Observable<T> {
  //   return this.http.post()
  // }
}
