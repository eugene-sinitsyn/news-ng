import { TopFilterStateModel } from './top-filter-state.model';
import { ArticleModel } from '../../models/article.model';
import { TopFiltersDictionary } from '../../models/top-filters-dictionary.model';

export class TopArticlesStateModel {
  public articles: ArticleModel[];
  public page: number;
  public filter: TopFilterStateModel;
  public savedFilters: TopFiltersDictionary;
}