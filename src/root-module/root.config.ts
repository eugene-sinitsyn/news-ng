import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { ReadLaterComponent } from './pages/read-later/read-later.component';
import { TopArticlesComponent } from './pages/top-articles/top-articles.component';

@Injectable()
export class RootConfig {
  public readonly apiBaseUrl: string = 'https://newsapi.org/v2';
  public readonly apiKey: string = 'fda9fe9838c14b07afb7ee94a9d0a7c8';
  public readonly darkThemeStylesUrl: string = 'assets/themes/pink-bluegrey.css';
  public readonly lightThemeStylesUrl: string = 'assets/themes/indigo-pink.css';
  public readonly tooltipDelay: number = 500; // ms
  public readonly notificationDuration: number = 3000; // ms
}

export const routes: Routes = [
  { path: '', component: TopArticlesComponent },
  { path: 'readlater', component: ReadLaterComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: '**', component: NotFoundComponent }
];

export function createTranslationLoader(httpClient: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(httpClient, './assets/translations/', '.json');
}