import { PreferencesStateModel } from './preferences-state.model';
import { TopArticlesStateModel } from './top-articles-state.model';
import { SearchArticlesStateModel } from './search-articles-state.model';
import { SourceDetailsModel } from '@domain';

export class RootStateModel {
  public preferences: PreferencesStateModel;
  public top: TopArticlesStateModel;
  public search: SearchArticlesStateModel;
  public sources: SourceDetailsModel[];
}