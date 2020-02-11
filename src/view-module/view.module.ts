import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
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
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LanguageEnum } from '@domain';
import { StateModule } from '@state';
import { ViewConfiguration } from './config/view-config';

import { AppComponent } from './root.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { TopArticlesComponent } from './pages/top-articles/top-articles.component';
import { SearchArticlesComponent } from './pages/search-articles/search-articles.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { SearchFilterComponent } from './components/filter/search/search-filter.component';
import { TopFilterComponent } from './components/filter/top/top-filter.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopFilterSwitchComponent } from './components/filter-switch/top/top-filter-switch.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SourcesSelectorComponent } from './components/sources-selector/sources-selector.component';
import { TopFilterListDialogComponent } from './components/filter-list-dialog/top/top-filter-list-dialog.component';
import { InputDialogComponent } from './components/input-dialog/input-dialog.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ReadLaterComponent } from './pages/read-later/read-later.component';
import { SearchFilterListDialogComponent } from './components/filter-list-dialog/search/search-filter-list-dialog.component';
import { SearchFilterSwitchComponent } from './components/filter-switch/search/search-filter-switch.component';
import { PagerComponent } from './components/pager/pager.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { PreferencesLinkComponent } from './components/preferences-link/preferences-link.component';

const routes: Routes = [
  { path: '', component: TopArticlesComponent },
  { path: 'search', component: SearchArticlesComponent },
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
  MatSnackBarModule
];

export function createTranslationLoader(httpClient: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(httpClient, './assets/translations/', '.json');
}

@NgModule({
  entryComponents: [MatSpinner, TopFilterListDialogComponent, InputDialogComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ArticleCardComponent,
    TopArticlesComponent,
    SearchArticlesComponent,
    PreferencesComponent,
    ArticlesComponent,
    SearchFilterComponent,
    TopFilterComponent,
    LanguageSelectorComponent,
    TopFilterSwitchComponent,
    SearchFilterSwitchComponent,
    SpinnerComponent,
    SourcesSelectorComponent,
    TopFilterListDialogComponent,
    SearchFilterListDialogComponent,
    InputDialogComponent,
    NotificationComponent,
    ReadLaterComponent,
    PagerComponent,
    PreferencesLinkComponent
  ],
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
    { provide: ViewConfiguration, useValue: new ViewConfiguration() }
  ],
  bootstrap: [AppComponent]
})
export class ViewModule {
  public constructor(translateService: TranslateService) {
    translateService.setDefaultLang(LanguageEnum.english);
    translateService.use(LanguageEnum.english);
  }
}