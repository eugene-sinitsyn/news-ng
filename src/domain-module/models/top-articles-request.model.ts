import { CountryEnum } from '../enums/country.enum';
import { CategoryEnum } from '../enums/category.enum';

export class TopArticlesRequestModel {
  public country: CountryEnum;
  public category: CategoryEnum;
  public sources: string[];
  public searchString: string;
  public pageSize: number;
  public page: number;
}