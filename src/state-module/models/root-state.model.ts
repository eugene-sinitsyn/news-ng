import { ArticleModel, SourceDetailsModel } from '@domain';

export class RootStateModel {
  public articles: ArticleModel[];
  public sources: SourceDetailsModel[];
}