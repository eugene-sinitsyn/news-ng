import { UiStateModel } from './ui-state.model';
import { PreferencesStateModel } from './preferences-state.model';
import { TopArticlesStateModel } from './top-state.model';
import { ReadLaterStateModel } from './read-later-state.model';
import { SourceDetailsModel } from '../../models/source-details.model';

export class RootStateModel {
  public ui: UiStateModel;
  public preferences: PreferencesStateModel;
  public top: TopArticlesStateModel;
  public readLater: ReadLaterStateModel;
  public sources: SourceDetailsModel[];
}