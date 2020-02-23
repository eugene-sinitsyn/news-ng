import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { StateModule } from '@state';
import { ViewConfiguration } from './config/view-config';

import { PreferencesFormService } from './services/preferences-form.service';

import { SpinnerDirective } from './directives/spinner.directive';
import { NotificationDirective } from './directives/notification.directive';
import { ThemeLoaderDirective } from './directives/theme-loader.directive';
import { LanguageSwitcherDirective } from './directives/language-switcher.directive';

import { AppComponent } from './root.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArticleCardComponent } from './components/articles/card/article-card.component';
import { TopArticlesComponent } from './pages/top-articles/top-articles.component';
import { ArticlesListComponent } from './components/articles/list/articles-list.component';
import { TopFilterComponent } from './components/top-filter/filter/top-filter.component';
import { TopFilterSwitchComponent } from './components/top-filter/filter-switch/top-filter-switch.component';
import { TopFilterListDialogComponent } from './components/top-filter/filter-list-dialog/top-filter-list-dialog.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { SourcesSelectorComponent } from './components/sources-selector/sources-selector.component';
import { InputDialogComponent } from './components/dialog/input/input-dialog.component';
import { ReadLaterComponent } from './pages/read-later/read-later.component';
import { PagerComponent } from './components/pager/pager.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { PreferencesLinkComponent } from './components/preferences/link/preferences-link.component';
import { PreferencesFormComponent } from './components/preferences/form/preferences-form.component';
import { ConfirmDialogComponent } from './components/dialog/confirm/confirm-dialog.component';

const routes: Routes = [
  { path: '', component: TopArticlesComponent },
  { path: 'readlater', component: ReadLaterComponent },
  { path: 'preferences', component: PreferencesComponent }
  // TODO: 404 page
];
const materialModules = [
  ScrollingModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatBadgeModule,
  MatTooltipModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatMenuModule,
  MatSnackBarModule,
  MatSlideToggleModule
];
const newsDirectives = [
  SpinnerDirective,
  NotificationDirective,
  ThemeLoaderDirective,
  LanguageSwitcherDirective
];
const newsComponents = [
  AppComponent,
  HeaderComponent,
  FooterComponent,
  ArticleCardComponent,
  TopArticlesComponent,
  PreferencesComponent,
  ArticlesListComponent,
  TopFilterComponent,
  LanguageSelectorComponent,
  TopFilterSwitchComponent,
  SourcesSelectorComponent,
  TopFilterListDialogComponent,
  InputDialogComponent,
  ConfirmDialogComponent,
  ReadLaterComponent,
  PagerComponent,
  PreferencesLinkComponent,
  PreferencesFormComponent
];

export function createTranslationLoader(httpClient: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(httpClient, './assets/translations/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    ...materialModules,
    BrowserAnimationsModule,
    FontAwesomeModule,
    TranslateModule.forRoot({ loader: {
      provide: TranslateLoader,
      useFactory: createTranslationLoader,
      deps: [HttpClient]
    }}),
    StateModule,
  ],
  providers: [
    ViewConfiguration,
    PreferencesFormService
  ],
  declarations: [...newsDirectives, ...newsComponents],
  bootstrap: [AppComponent]
})
export class ViewModule {}