import { CategoryEnum } from '../enums/category.enum';
import { LanguageEnum } from '../enums/language.enum';
import { CountryEnum } from '../enums/country.enum';

export class SourcesRequestModel {
  public language: LanguageEnum;
  public category?: CategoryEnum;
  public country?: CountryEnum;
}