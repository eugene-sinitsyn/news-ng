import { PreferencesFormService } from './forms/preferences-form.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { PreferencesStorageService } from './local-storage/preferences-storage.service';
import { ReadLaterStorageService } from './local-storage/read-later-storage.service';
import { TopFiltersStorageService } from './local-storage/top-filters-storage.service';
import { ArticlesService } from './network/articles.service';
import { SourcesService } from './network/sources.service';

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
  ArticlesService,
  SourcesService
];