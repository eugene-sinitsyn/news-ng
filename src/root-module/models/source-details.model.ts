import { SourceModel } from './source.model';
import { LanguageEnum } from '../enums/language.enum';
import { CategoryEnum } from '../enums/category.enum';
import { CountryEnum } from '../enums/country.enum';

export class SourceDetailsModel extends SourceModel {
  public description: string;
  public url: string;
  public category: CategoryEnum;
  public language: LanguageEnum;
  public country: CountryEnum;
}