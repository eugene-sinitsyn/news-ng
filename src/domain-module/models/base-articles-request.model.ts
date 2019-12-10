import { LanguageEnum } from '../enums/language.enum';

export abstract class BaseArticlesRequestModel {
  public language: LanguageEnum;
  public sources?: string[];
  public searchString?: string; // TODO: URL encode
  public pageSize?: number;
  public page?: number;
}