import { PreferencesFormService } from './forms/preferences-form.service';
import { TopFilterFormService } from './forms/top-filter-form.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import {
  PreferencesStorageService
} from './local-storage/preferences-storage.service';
import { ReadLaterStorageService } from './local-storage/read-later-storage.service';
import { SourcesStorageService } from './local-storage/sources-storage.service';
import {
  TopFiltersStorageService
} from './local-storage/top-filters-storage.service';
import { ArticlesHttpService } from './network/articles-http.service';
import { SourcesHttpService } from './network/sources-http.service';

export const newsFormsServices = [
  PreferencesFormService,
  TopFilterFormService
];

export const newsStorageServices = [
  LocalStorageService,
  PreferencesStorageService,
  ReadLaterStorageService,
  SourcesStorageService,
  TopFiltersStorageService
];

export const newsNetworkServices = [
  ArticlesHttpService,
  SourcesHttpService
];