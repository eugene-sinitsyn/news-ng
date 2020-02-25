import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResponseStatus } from '../../enums/response-status.enum';
import { ArticleModel } from '../../models/article.model';
import { ArticlesResponseModel } from '../../models/articles-response.model';
import { TopArticlesRequestModel } from '../../models/top-articles-request.model';
import { RootConfig } from '../../root.config';

@Injectable()
export class ArticlesHttpService {
  public constructor(
    private readonly rootConfig: RootConfig,
    private readonly httpClient: HttpClient
  ) {}

  public async fetchTop(
    request: TopArticlesRequestModel
  ): Promise<ArticleModel[]> {
    const endpointUrl = `${this.rootConfig.apiBaseUrl}/top-headlines`;
    const params = this.createTopArticlesParams(request);
    const response: ArticlesResponseModel = await this.httpClient
      .get<ArticlesResponseModel>(endpointUrl, { params })
      .toPromise();

    if (response.status === ResponseStatus.error)
      throw new Error(response.message);
    else return response.articles || [];
  }

  private createTopArticlesParams(request: TopArticlesRequestModel): HttpParams {
    let params: HttpParams = new HttpParams()
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