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
    // 100 articles is the dev plan limitation
    let params: HttpParams = new HttpParams().set('pageSize', '100');
    if (request.page) params = params.set('page', request.page.toString());

    const searchStringIsSet = !!request.searchString;
    const sourceIsSet = !!request.sources?.length;
    const countryIsSet = !!request.country;
    const categoryIsSet = !!request.category;

    if (searchStringIsSet)
      params = params.set('q', encodeURI(request.searchString));

    // override rules:
    //   - source > country and category
    //   - source or country or category or search string > language
    if (sourceIsSet) params = params.set('sources', request.sources.join(','));
    else if (countryIsSet || categoryIsSet) {
      if (countryIsSet) params = params.set('country', request.country);
      if (categoryIsSet) params = params.set('category', request.category);
    } else if (!searchStringIsSet) // nothing is set
      params = params.set('language', request.language);

    return params;
  }
}