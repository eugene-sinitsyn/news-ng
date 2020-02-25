import { PreferencesFormService } from './forms/preferences-form.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import {
  PreferencesStorageService
} from './local-storage/preferences-storage.service';
import { ReadLaterStorageService } from './local-storage/read-later-storage.service';
import {
  TopFiltersStorageService
} from './local-storage/top-filters-storage.service';
import { ArticlesHttpService } from './network/articles-http.service';
import { SourcesHttpService } from './network/sources-http.service';

export const newsFormsServices = [
  PreferencesFormService
];

export const newsStorageServices = [
  LocalStorageService,
  PreferencesStorageService,
  ReadLaterStorageService,
  TopFiltersStorageService
];

export const newsNetworkServices = [
  ArticlesHttpService,
  SourcesHttpService
];