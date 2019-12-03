import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environment';

export abstract class HttpService {
  protected constructor(protected readonly httpClient: HttpClient) {}

  protected async httpGet(
    endpoint: string,
    queryParams: HttpParams = null
  ): Promise<any> {
    const url = `${environment.apiBaseUrl}/${endpoint}`;
    const response = await this.httpClient
      .get(url, { params: queryParams })
      .toPromise();
    return response;
  }
}