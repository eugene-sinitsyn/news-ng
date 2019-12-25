import { CountryEnum, CategoryEnum } from '@domain';

export class TopFilterStateModel {
  public category?: CategoryEnum;
  public country?: CountryEnum;
  public sources?: string[];
  public searchString?: string;
}