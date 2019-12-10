import { SortOrderEnum } from '../enums/sort-order.enum';
import { BaseArticlesRequestModel } from './base-articles-request.model';

export class SearchArticlesRequestModel extends BaseArticlesRequestModel {
  public searchInTitleOnly: boolean;
  public from: Date;
  public to: Date;
  public sortBy: SortOrderEnum;
}