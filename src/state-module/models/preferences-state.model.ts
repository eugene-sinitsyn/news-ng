import { LanguageEnum, PageSizeEnum } from '@domain';

export class PreferencesStateModel {
  public language: LanguageEnum;
  public pageSize: PageSizeEnum;
  public infiniteScroll: boolean;
}