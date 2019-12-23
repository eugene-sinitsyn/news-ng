import { ArticleModel, SourceDetailsModel, PreferencesModel } from '@domain';

export class RootStateModel {
  public preferences: PreferencesModel;
  public articles: ArticleModel[];
  public sources: SourceDetailsModel[];
}