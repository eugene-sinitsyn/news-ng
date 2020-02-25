import { CategoryEnum } from '../enums/category.enum';
import { CountryEnum } from '../enums/country.enum';
import { LanguageEnum } from '../enums/language.enum';

export class SourcesRequestModel {
  public language?: LanguageEnum;
  public category?: CategoryEnum;
  public country?: CountryEnum;
}