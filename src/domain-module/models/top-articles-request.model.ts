import { CountryEnum } from '../enums/country.enum';
import { CategoryEnum } from '../enums/category.enum';
import { BaseArticlesRequestModel } from './base-articles-request.model';

export class TopArticlesRequestModel extends BaseArticlesRequestModel {
  public country?: CountryEnum;
  public category?: CategoryEnum;
}