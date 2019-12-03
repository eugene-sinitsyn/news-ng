import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpService } from '../http/http.service';
import { ArticleModel, TopArticlesRequestModel } from '@domain';
import { environment } from '@environment';

export class ArticlesService extends HttpService {
  public constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public async getTop(request: TopArticlesRequestModel): Promise<void> { // Promise<ArticleModel[]>
    const params = new HttpParams();
    params.set('apiKey', environment.apiKey);
    if (request) {
      if (request.country) params.set('country', request.country);
      if (request.category) params.set('category', request.category);
      if (request.sources) params.set('sources', request.sources.join(','))
      if (request.searchString) params.set('q', request.searchString);
      if (request.pageSize) params.set('pageSize', request.pageSize.toString());
      if (request.page) params.set('page', request.page.toString());
    }

    const response = await this.httpGet('top-headlines', params);
    console.dir(response);
  }
}