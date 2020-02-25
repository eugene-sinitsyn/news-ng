import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResponseStatus } from '../../enums/response-status.enum';
import { SourceDetailsModel } from '../../models/source-details.model';
import { SourcesRequestModel } from '../../models/sources-request.model';
import { SourcesResponseModel } from '../../models/sources-response.model';
import { RootConfig } from '../../root.config';

@Injectable()
export class SourcesHttpService {
  public constructor(
    private readonly rootConfig: RootConfig,
    private readonly httpClient: HttpClient
  ) {}

  public async search(
    request?: SourcesRequestModel
  ): Promise<SourceDetailsModel[]> {
    const endpointUrl = `${this.rootConfig.apiBaseUrl}/sources`;
    const params = this.createSourcesParams(request);
    const response: SourcesResponseModel = await this.httpClient
      .get<SourcesResponseModel>(endpointUrl, { params })
      .toPromise();

    if (response.status === ResponseStatus.error)
      throw new Error(response.message);
    else return response.sources || [];
  }

  private createSourcesParams(request: SourcesRequestModel): HttpParams {
    let params: HttpParams = new HttpParams();
    if (request) {
      if (request.language) params = params.set('language', request.language);
      if (request.country) params = params.set('country', request.country);
      if (request.category) params = params.set('category', request.category);
    }

    return params;
  }
}