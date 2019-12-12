import { CategoryEnum } from '../enums/category.enum';
import { LanguageEnum } from '../enums/language.enum';
import { CountryEnum } from '../enums/country.enum';

export class ArticleSourcesRequestModel {
  public language: LanguageEnum;
  public category?: CategoryEnum;
  public country?: CountryEnum;
}