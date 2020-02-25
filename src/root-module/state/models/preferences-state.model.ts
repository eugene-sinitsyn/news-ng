import { LanguageEnum } from '../../enums/language.enum';
import { PageSizeEnum } from '../../enums/page-size.enum';

export class PreferencesStateModel {
  public language: LanguageEnum;
  public defaultTopFilterName?: string;
  public pageSize: PageSizeEnum;
  public infiniteScroll: boolean;
  public darkTheme?: boolean;
}