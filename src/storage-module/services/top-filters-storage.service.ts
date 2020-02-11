import { Injectable } from '@angular/core';
import { TopArticlesRequestModel, TopFiltersDictionary } from '@domain';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class TopFiltersStorageService {
  public constructor(private readonly localStorageService: LocalStorageService) {
    const filters = localStorageService.get(this.namespace);
    if (!filters || typeof filters !== 'object')
      localStorageService.store(this.namespace, {});
  }

  private readonly namespace: string = 'topFilters';

  public store(name: string, filter: TopArticlesRequestModel): void {
    if (!name || !filter) return;
    const filters = this.localStorageService.get(this.namespace);
    filters[name] = filter;
    this.localStorageService.store(this.namespace, filters);
  }

  public getAll(): TopFiltersDictionary {
    const filters = this.localStorageService.get(this.namespace);
    return Object.keys(filters).reduce((dictionary, filterName) => {
      dictionary[filterName] = new TopArticlesRequestModel(filters[filterName]);
      return dictionary;
    }, {});
  }

  public get(name: string): TopArticlesRequestModel {
    const filters = this.localStorageService.get(this.namespace);
    return filters[name] ? new TopArticlesRequestModel(filters[name]) : null;
  }

  public deleteAll(): void {
    this.localStorageService.store(this.namespace, {});
  }

  public delete(name: string): void {
    const filters = this.localStorageService.get(this.namespace);
    delete filters[name];
    this.localStorageService.store(this.namespace, filters);
  }
}