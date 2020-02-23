import { ArticleModel } from '@domain';

export class ReadLaterStateModel {
  public articles: ArticleModel[];
  public page: number;
}