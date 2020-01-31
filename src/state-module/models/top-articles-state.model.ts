import { ArticleModel, TopFiltersDictionary } from '@domain';
import { TopFilterStateModel } from './top-filter-state.model';

export class TopArticlesStateModel {
  public filter: TopFilterStateModel;
  public savedFilters: TopFiltersDictionary;
  public articles: ArticleModel[];
  public total: number;
}