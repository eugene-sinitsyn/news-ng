import { CountryEnum } from '../enums/country.enum';
import { CategoryEnum } from '../enums/category.enum';
import { LanguageEnum } from '../enums/language.enum';

export class TopArticlesRequestModel {
  public language: LanguageEnum;
  public country?: CountryEnum;
  public category?: CategoryEnum;
  public sources?: string[];
  public searchString?: string;
  public pageSize?: number;
  public page?: number;
}