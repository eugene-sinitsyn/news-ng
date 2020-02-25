import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { RootConfig } from '../../root.config';
import { SourcesRequestModel } from '../../models/sources-request.model';
import { SourceDetailsModel } from '../../models/source-details.model';
import { SourcesResponseModel } from '../../models/sources-response.model';
import { ResponseStatus } from '../../enums/response-status.enum';

@Injectable()
export class SourcesService extends HttpService {
  public constructor(rootConfig: RootConfig, httpClient: HttpClient) {
    super(rootConfig, httpClient);
  }

  public async search(
    request?: SourcesRequestModel
  ): Promise<SourceDetailsModel[]> {
    let params: HttpParams = new HttpParams()
      .set('apiKey', this.rootConfig.apiKey);
    if (request) {
      if (request.language) params = params.set('language', request.language);
      if (request.country) params = params.set('country', request.country);
      if (request.category) params = params.set('category', request.category);
    }

    const response: SourcesResponseModel = await this.httpGet('sources', params);

    if (response.status === ResponseStatus.error)
      throw new Error(response.message);
    else return response.sources || [];
  }
}