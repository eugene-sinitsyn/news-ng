import { ArticleModel, TopFiltersDictionary } from '@domain';
import { TopFilterStateModel } from './top-filter-state.model';

export class TopArticlesStateModel {
  public articles: ArticleModel[];
  public page: number;
  public filter: TopFilterStateModel;
  public savedFilters: TopFiltersDictionary;
}