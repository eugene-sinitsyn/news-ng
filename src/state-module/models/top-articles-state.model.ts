import { TopArticlesRequestModel, ArticleModel } from '@domain';

export class TopArticlesStateModel {
  public filter: TopArticlesRequestModel;
  public articles: ArticleModel[];
}