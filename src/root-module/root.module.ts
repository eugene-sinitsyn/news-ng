import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';

import { newsMaterialModules } from './material';
import { RootConfig, routes, createTranslationLoader } from './root.config';
import { newsDirectives } from './directives';
import { RootComponent, newsComponents } from './components';
import { newsPageComponents } from './pages';
import { EffectsModule } from '@ngrx/effects';
import { newsReducers, newsEffects } from './state';
import { RootStateModel } from './state/models/root-state.model';
import { newsFormsServices, newsStorageServices, newsNetworkServices } from './services';

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
    ...newsNetworkServices
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