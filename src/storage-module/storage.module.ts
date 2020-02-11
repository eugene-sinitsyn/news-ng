import { NgModule } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { TopFiltersStorageService } from './services/top-filters-storage.service';
import { ArticlesStorageService } from './services/articles-storage.service';
import { PreferencesStorageService } from './services/preferences-storage.service';

@NgModule({
  providers: [
    LocalStorageService,
    TopFiltersStorageService,
    ArticlesStorageService,
    PreferencesStorageService
  ]
})
export class StorageModule {}