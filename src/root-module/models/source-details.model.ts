import { CategoryEnum } from '../enums/category.enum';
import { CountryEnum } from '../enums/country.enum';
import { LanguageEnum } from '../enums/language.enum';
import { SourceModel } from './source.model';

export class SourceDetailsModel extends SourceModel {
  public description: string;
  public url: string;
  public category: CategoryEnum;
  public language: LanguageEnum;
  public country: CountryEnum;
}