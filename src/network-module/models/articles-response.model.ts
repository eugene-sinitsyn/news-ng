import { ArticleModel } from '@domain';

export class ArticlesResponseModel {
  public status: string;
  public code?: string;
  public message?: string;
  public totalResults: number;
  public articles: ArticleModel[];
}