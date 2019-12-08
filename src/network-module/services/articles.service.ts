import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpService } from '../http/http.service';
import { TopArticlesRequestModel, ArticleModel } from '@domain';
import { environment } from '@environment';
import { Injectable } from '@angular/core';
import { ArticlesResponseModel } from '../models/articles-response.model';
import { ResponseStatus } from '../enums/response-status.enum';

@Injectable()
export class ArticlesService extends HttpService {
  public constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public async getTop(request: TopArticlesRequestModel): Promise<ArticleModel[]> {
    let params: HttpParams = new HttpParams()
      .set('apiKey', environment.apiKey)
      .set('language', request.language);

    if (request.country) params = params.set('country', request.country);
    if (request.category) params = params.set('category', request.category);
    if (request.sources) params.set('sources', request.sources.join(','));
    if (request.searchString) params.set('q', request.searchString);
    if (request.pageSize) params.set('pageSize', request.pageSize.toString());
    if (request.page) params.set('page', request.page.toString());

    const response: ArticlesResponseModel =
      await this.httpGet('top-headlines', params);

    if (response.status === ResponseStatus.error)
      throw new Error(response.message);
    else return response.articles || [];
  }
}