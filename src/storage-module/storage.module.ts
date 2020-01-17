import { NgModule } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { TopFiltersStorageService } from './services/top-filters-storage.service';

@NgModule({
  providers: [LocalStorageService, TopFiltersStorageService]
})
export class StorageModule {}