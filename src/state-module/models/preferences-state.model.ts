import { LanguageEnum, PageSizeEnum } from '@domain';

export class PreferencesStateModel {
  public language: LanguageEnum;
  public defaultTopFilterName?: string;
  public pageSize: PageSizeEnum;
  public infiniteScroll: boolean;
  public darkTheme?: boolean;
}