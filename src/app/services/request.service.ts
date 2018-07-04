import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  Handlers,
  GetOptions,
  PostOptions,
  PutOptions,
  DeleteOptions
} from './interfaces/request.interfaces';

import { AppConfig } from '../app.config';

// request service
@Injectable()
export class RequestService {

  private apiUrl: string = AppConfig.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public post<TRequestBody, TResponseBody>(options: PostOptions<TRequestBody, TResponseBody>): any {
    return this.httpClient
      .post<TResponseBody>(this.apiUrl + options.url, options.body)
      .subscribe(options.handlers.success, options.handlers.error);
  }

  public get<TResponseBody>(options: GetOptions<TResponseBody>): any {
    return this.httpClient
      .get<TResponseBody>(this.apiUrl + options.url, {params: options.parameters})
      .subscribe(options.handlers.success, options.handlers.error);
  }

  public put<TRequestBody, TResponseBody>(options: PutOptions<TRequestBody, TResponseBody>): any {
    return this.httpClient
      .put<TResponseBody>( this.apiUrl + options.url, options.body)
      .subscribe(options.handlers.success, options.handlers.error);
  }

  public delete<TResponseBody>(options: DeleteOptions<TResponseBody>): any {
    return this.httpClient
      .delete<TResponseBody>(this.apiUrl + options.url, {params: options.parameters})
      .subscribe(options.handlers.success, options.handlers.error);
  }
}
