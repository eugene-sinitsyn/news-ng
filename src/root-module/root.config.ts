import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TopArticlesComponent } from './pages/top-articles/top-articles.component';
import { ReadLaterComponent } from './pages/read-later/read-later.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';

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
  { path: 'preferences', component: PreferencesComponent }
  // TODO: 404 page
];

export function createTranslationLoader(httpClient: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(httpClient, './assets/translations/', '.json');
}