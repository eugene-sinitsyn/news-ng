import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RootConfig } from '../root.config';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  public constructor(private readonly rootConfig: RootConfig) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.isNewsApiCall(request.url)) {
      const params = request.params.set('apiKey', this.rootConfig.apiKey);
      request = request.clone({ params });
    }

    return next.handle(request);
  }

  private isNewsApiCall(url: string): boolean {
    return url.search(this.rootConfig.apiBaseUrl) >= 0;
  }
}