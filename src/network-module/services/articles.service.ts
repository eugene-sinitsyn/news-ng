import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TopArticlesRequestModel, ArticleModel } from '@domain';
import { environment } from '@environment';
import { HttpService } from '../http/http.service';
import { ArticlesResponseModel } from '../models/articles-response.model';
import { ResponseStatus } from '../enums/response-status.enum';

@Injectable()
export class ArticlesService extends HttpService {
  public constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public async fetchTop(request: TopArticlesRequestModel): Promise<ArticleModel[]> {
    const params = this.createTopArticlesParams(request);
    const response: ArticlesResponseModel = await this.httpGet('top-headlines', params);

    if (response.status === ResponseStatus.error) throw new Error(response.message);
    else return response.articles || [];
  }

  private createTopArticlesParams(request: TopArticlesRequestModel): HttpParams {
    let params: HttpParams = new HttpParams()
      .set('apiKey', environment.apiKey)
      .set('language', request.language);

    if (request.country) params = params.set('country', request.country);
    if (request.category) params = params.set('category', request.category);
    if (request.sources && request.sources.length)
      params = params.set('sources', request.sources.join(','));
    if (request.searchString)
      params = params.set('q', encodeURI(request.searchString));
    if (request.pageSize) params = params.set('pageSize', request.pageSize.toString());
    if (request.page) params = params.set('page', request.page.toString());

    return params;
  }
}