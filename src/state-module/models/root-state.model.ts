import { ArticleModel, SourceDetailsModel } from '@domain';
import { PreferencesModel } from './preferences.model';

export class RootStateModel {
  public preferences: PreferencesModel;
  public articles: ArticleModel[];
  public sources: SourceDetailsModel[];
}