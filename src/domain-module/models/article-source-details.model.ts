import { ArticleSourceModel } from './article-source.model';
import { LanguageEnum } from '../enums/language.enum';
import { CategoryEnum } from '../enums/category.enum';
import { CountryEnum } from '../enums/country.enum';

export class ArticleSourceDetailsModel extends ArticleSourceModel {
  public description: string;
  public url: string;
  public category: CategoryEnum;
  public language: LanguageEnum;
  public country: CountryEnum;
}