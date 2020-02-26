import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ResponseStatus } from '../enums/response-status.enum';
import { SourceDetailsModel } from '../models/source-details.model';
import { SourcesResponseModel } from '../models/sources-response.model';
import { RootConfig } from '../root.config';
import {
  SourcesStorageService
} from '../services/local-storage/sources-storage.service';

@Injectable()
export class SourcesCacheInterceptor implements HttpInterceptor {
  public constructor(
    private readonly rootConfig: RootConfig,
    private readonly sourcesStorageService: SourcesStorageService
  ) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isSourcesCall(request.url)) return next.handle(request);

    const cachedSources = this.sourcesStorageService.get();
    if (cachedSources && !this.sourcesStorageService.isStale)
      return of(this.toHttpResponse(request.url, cachedSources));

    return next.handle(request).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        const response = event as HttpResponse<SourcesResponseModel>;
        this.sourcesStorageService.store(response.body?.sources);
      }
    }));
  }

  private isSourcesCall(url: string): boolean {
    return url.search(`${this.rootConfig.apiBaseUrl}/sources`) >= 0;
  }

  private toHttpResponse(
    url: string,
    sources: SourceDetailsModel[]
  ): HttpResponse<SourcesResponseModel> {
    const body = new SourcesResponseModel();
    body.status = ResponseStatus.ok;
    body.sources = sources;

    return new HttpResponse({ body, status: 200, statusText: 'OK', url });
  }
}