import { ArticleSourceDetailsModel } from '@domain';

export class ArticleSourcesResponseModel {
  public status: string;
  public code?: string;
  public message?: string;
  public sources: ArticleSourceDetailsModel[];
}