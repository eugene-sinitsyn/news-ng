import { ResponseStatus } from '../enums/response-status.enum';
import { ArticleModel } from './article.model';

export class ArticlesResponseModel {
  public status: ResponseStatus;
  public code?: string;
  public message?: string;
  public totalResults: number;
  public articles: ArticleModel[];
}