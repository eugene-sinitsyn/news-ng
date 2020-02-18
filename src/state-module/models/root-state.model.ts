import { SourceDetailsModel, ArticleModel } from '@domain';
import { UiStateModel } from './ui-state.model';
import { PreferencesStateModel } from './preferences-state.model';
import { TopArticlesStateModel } from './top-articles-state.model';

export class RootStateModel {
  public ui: UiStateModel;
  public preferences: PreferencesStateModel;
  public top: TopArticlesStateModel;
  public readLater: ArticleModel[];
  public sources: SourceDetailsModel[];
}