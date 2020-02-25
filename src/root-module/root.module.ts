import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { newsComponents, RootComponent } from './components';
import { newsDirectives } from './directives';
import { newsInterceptorProviders } from './interceptors';
import { newsMaterialModules } from './material';
import { newsPageComponents } from './pages';
import { createTranslationLoader, RootConfig, routes } from './root.config';
import {
  newsFormsServices,
  newsNetworkServices,
  newsStorageServices
} from './services';
import { newsEffects, newsReducers } from './state';
import { RootStateModel } from './state/models/root-state.model';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...newsMaterialModules,
    FontAwesomeModule,
    StoreModule.forRoot<RootStateModel>(newsReducers),
    EffectsModule.forRoot(newsEffects),
    TranslateModule.forRoot({ loader: {
      provide: TranslateLoader,
      useFactory: createTranslationLoader,
      deps: [HttpClient]
    }}),
  ],
  providers: [
    RootConfig,
    ...newsFormsServices,
    ...newsStorageServices,
    ...newsNetworkServices,
    ...newsInterceptorProviders
  ],
  declarations: [
    ...newsDirectives,
    ...newsComponents,
    ...newsPageComponents,
    RootComponent
  ],
  bootstrap: [RootComponent]
})
export class RootModule {}