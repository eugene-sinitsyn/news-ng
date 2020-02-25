import { HttpClient, HttpParams } from '@angular/common/http';
import { RootConfig } from '../../root.config';

export abstract class HttpService {
  protected constructor(
    protected readonly rootConfig: RootConfig,
    protected readonly httpClient: HttpClient
  ) {}

  protected async httpGet(
    endpoint: string,
    queryParams: HttpParams = null
  ): Promise<any> {
    const url = `${this.rootConfig.apiBaseUrl}/${endpoint}`;
    const response = await this.httpClient
      .get(url, { params: queryParams })
      .toPromise();
    return response;
  }
}