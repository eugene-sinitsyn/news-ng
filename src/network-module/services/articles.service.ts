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

  public async fetchTop(
    request: TopArticlesRequestModel
  ): Promise<ArticleModel[]> {
    const params = this.createTopArticlesParams(request);
    const response: ArticlesResponseModel = await this.httpGet('top-headlines', params);

    if (response.status === ResponseStatus.error)
      throw new Error(response.message);
    else return response.articles || [];
  }

  private createTopArticlesParams(request: TopArticlesRequestModel): HttpParams {
    let params: HttpParams = new HttpParams()
      .set('apiKey', environment.apiKey)
      .set('pageSize', '100'); // dev plan limitation

    if (request.page) params = params.set('page', request.page.toString());
    if (request.category) params = params.set('category', request.category);
    else if (request.searchString)
      params = params.set('q', encodeURI(request.searchString));

    // priority: 1: source, 2: country, 3: search string, 4: language
    if (request.sources && request.sources.length)
      params = params.set('sources', request.sources.join(','));
    else if (request.country) params = params.set('country', request.country);
    else if (!request.searchString) params = params.set('language', request.language);

    return params;
  }
}