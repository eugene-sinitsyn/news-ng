import { NgModule } from '@angular/core';
import { LocalStorageService } from './local-storage/local-storage.service';
import { TopFiltersStorageService } from './services/top-filters-storage.service';
import { ReadLaterStorageService } from './services/read-later-storage.service';
import { PreferencesStorageService } from './services/preferences-storage.service';

@NgModule({
  providers: [
    LocalStorageService,
    TopFiltersStorageService,
    ReadLaterStorageService,
    PreferencesStorageService
  ]
})
export class StorageModule {}