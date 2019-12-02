import { ArticleModel } from '@domain/models';

export class ArticlesResponseModel {
  public status: string;
  public code?: string;
  public message?: string;
  public totalResults: number;
  public articles: ArticleModel[];
}