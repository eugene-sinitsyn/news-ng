import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';

export abstract class HttpService {
  protected constructor(protected readonly httpClient: HttpClient) {}

  protected async httpGet(
    url: string,
    queryParams: { [key: string]: string } = null
  ): Promise<any> {
    const query = this.toQueryParamsString(queryParams);
    const response = await this.httpClient
      .get(`${environment.apiBaseUrl}/${url}${query}`)
      .toPromise();
    return response;
  }

  protected toQueryParamsString(queryParams: { [key: string]: string }): string {
    if (!queryParams) return '';

    const params = Object
      .keys(queryParams)
      .filter(key => queryParams[key])
      .map(key => `${key}=${queryParams[key]}`)
      .join('&');
    return params ? `?${params}` : '';
  }
}