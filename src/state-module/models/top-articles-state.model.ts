import { ArticleModel, TopFiltersDictionary } from '@domain';
import { TopFilterStateModel } from './top-filter-state.model';

export class TopArticlesStateModel {
  public filter: TopFilterStateModel;
  public articles: ArticleModel[];
  public savedFilters: TopFiltersDictionary;
}