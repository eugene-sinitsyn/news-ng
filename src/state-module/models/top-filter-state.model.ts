import { CountryEnum, CategoryEnum } from '@domain';

export class TopFilterStateModel {
  public category?: CategoryEnum = null;
  public country?: CountryEnum = null;
  public sources?: string[] = [];
  public searchString?: string = null;
}