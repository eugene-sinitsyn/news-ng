import { SearchArticlesRequestModel, ArticleModel } from '@domain';

export class SearchArticlesStateModel {
  public filter: SearchArticlesRequestModel;
  public articles: ArticleModel[];
  public total: number;
}