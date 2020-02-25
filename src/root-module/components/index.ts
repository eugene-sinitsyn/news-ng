import { ArticleCardComponent } from  './articles/card/article-card.component';
import { ArticlesListComponent } from './articles/list/articles-list.component';
import { ConfirmDialogComponent } from './dialog/confirm/confirm-dialog.component';
import { InputDialogComponent } from './dialog/input/input-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { PagerComponent } from './pager/pager.component';
import { PreferencesFormComponent } from './preferences/form/preferences-form.component';
import { PreferencesLinkComponent } from './preferences/link/preferences-link.component';
import { SourcesSelectorComponent } from './sources-selector/sources-selector.component';
import { TopFilterComponent } from './top-filter/filter/top-filter.component';
import { TopFilterListDialogComponent } from './top-filter/filter-list-dialog/top-filter-list-dialog.component';
import { TopFilterSwitchComponent } from './top-filter/filter-switch/top-filter-switch.component';

export * from './root/root.component';
export const newsComponents = [
  ArticleCardComponent,
  ArticlesListComponent,
  ConfirmDialogComponent,
  InputDialogComponent,
  FooterComponent,
  HeaderComponent,
  LanguageSelectorComponent,
  PagerComponent,
  PreferencesFormComponent,
  PreferencesLinkComponent,
  SourcesSelectorComponent,
  TopFilterComponent,
  TopFilterListDialogComponent,
  TopFilterSwitchComponent
];