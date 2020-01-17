import { CountryEnum } from '../enums/country.enum';
import { CategoryEnum } from '../enums/category.enum';
import { BaseArticlesRequestModel } from './base-articles-request.model';

export class TopArticlesRequestModel extends BaseArticlesRequestModel {
  public constructor(raw?: any) {
    super(raw);
    if (raw) {
      this.country = raw['country'];
      this.category = raw['category'];
    }
  }

  public country?: CountryEnum;
  public category?: CategoryEnum;
}