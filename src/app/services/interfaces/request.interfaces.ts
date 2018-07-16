import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export interface Handlers<TResponseBody> {
  success(data: TResponseBody);
  error(httpErrorResponse: HttpErrorResponse);
}

export interface GetOptions<TResponseBody> {
  url: string;
  parameters?: HttpParams;
  handlers: Handlers<TResponseBody>;
  headers?: HttpHeaders;
}

export interface PutOptions<TRequestBody, TResponseBody> {
  url: string;
  parameters?: HttpParams;
  body: TRequestBody;
  handlers?: Handlers<TResponseBody>;
}

export interface PostOptions<TRequestBody, TResponseBody> {
  url: string;
  parameters?: HttpParams;
  body: TRequestBody;
  handlers?: Handlers<TResponseBody>;
}

export interface DeleteOptions<TResponseBody> {
  url: string;
  parameters?: HttpParams;
  handlers?: Handlers<TResponseBody>;
}
