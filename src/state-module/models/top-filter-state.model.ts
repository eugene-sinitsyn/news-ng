import { CountryEnum, CategoryEnum } from '@domain';

export class TopFilterStateModel {
  public constructor(raw?: any) {
    this.category = raw ? raw.category : null;
    this.country = raw ? raw.country : null;
    this.searchString = raw ? raw.searchString : null;
    this.sources = raw ? raw.sources : [];
  }

  public category?: CategoryEnum;
  public country?: CountryEnum;
  public searchString?: string;
  public sources?: string[];

  public get isEmpty(): boolean {
    return !this.category
        && !this.country
        && !this.searchString
        && (!this.sources || !this.sources.length);
  }
}