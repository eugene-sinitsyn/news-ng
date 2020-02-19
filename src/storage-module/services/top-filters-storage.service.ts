import { Injectable } from '@angular/core';
import { TopArticlesRequestModel, TopFiltersDictionary } from '@domain';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable()
export class TopFiltersStorageService {
  public constructor(private readonly localStorageService: LocalStorageService) {
    const filters = localStorageService.get(this.namespace);
    if (!filters || typeof filters !== 'object')
      localStorageService.store(this.namespace, {});
  }

  private readonly namespace: string = 'topFilters';

  public store(filters: TopFiltersDictionary): void {
    this.localStorageService.store(this.namespace, filters);
  }

  public get(): TopFiltersDictionary {
    const filters = this.localStorageService.get(this.namespace);
    return Object.keys(filters).reduce((dictionary, filterName) => {
      dictionary[filterName] = new TopArticlesRequestModel(filters[filterName]);
      return dictionary;
    }, {});
  }
}