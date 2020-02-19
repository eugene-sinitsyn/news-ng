import { LanguageEnum, PageSizeEnum } from '@domain';
import { TopFilterStateModel } from './top-filter-state.model';

export class PreferencesStateModel {
  public language: LanguageEnum;
  public topFilter?: TopFilterStateModel;
  public pageSize: PageSizeEnum;
  public infiniteScroll: boolean;
  public darkTheme?: boolean;
}