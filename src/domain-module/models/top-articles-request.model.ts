import { CountryEnum } from '../enums/country.enum';
import { CategoryEnum } from '../enums/category.enum';
import { LanguageEnum } from '../enums/language.enum';

export class TopArticlesRequestModel {
  public constructor(raw?: any) {
    if (raw) {
      this.language = raw['language'];
      this.sources = raw['sources'];
      this.searchString = raw['searchString'];
      this.pageSize = raw['pageSize'];
      this.page = raw['page'];
      this.country = raw['country'];
      this.category = raw['category'];
    }
  }

  public language: LanguageEnum;
  public sources?: string[];
  public searchString?: string;
  public pageSize?: number;
  public page?: number;
  public country?: CountryEnum;
  public category?: CategoryEnum;
}