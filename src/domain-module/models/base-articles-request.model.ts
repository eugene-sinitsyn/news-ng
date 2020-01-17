import { LanguageEnum } from '../enums/language.enum';

export abstract class BaseArticlesRequestModel {
  protected constructor(raw?: any) {
    if (raw) {
      this.language = raw['language'];
      this.sources = raw['sources'];
      this.searchString = raw['searchString'];
      this.pageSize = raw['pageSize'];
      this.page = raw['page'];
    }
  }

  public language: LanguageEnum;
  public sources?: string[];
  public searchString?: string;
  public pageSize?: number;
  public page?: number;
}