import { LanguageEnum } from '@domain';

export class PreferencesStateModel {
  public language: LanguageEnum;
  public pageSize: number;
  public infiniteScroll: boolean;
}