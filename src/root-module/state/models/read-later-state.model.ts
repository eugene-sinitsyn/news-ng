import { ArticleModel } from '../../models/article.model';

export class ReadLaterStateModel {
  public articles: ArticleModel[];
  public page: number;
}