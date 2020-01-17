import { SortOrderEnum } from '../enums/sort-order.enum';
import { BaseArticlesRequestModel } from './base-articles-request.model';

export class SearchArticlesRequestModel extends BaseArticlesRequestModel {
  public constructor(raw?: any) {
    super(raw);
    if (raw) {
      this.searchInTitleOnly = raw['searchInTitleOnly'];
      this.from = raw['from'];
      this.to = raw['to'];
      this.sortBy = raw['sortBy'];
    }
  }

  public searchInTitleOnly?: boolean;
  public from?: Date;
  public to?: Date;
  public sortBy?: SortOrderEnum;
}