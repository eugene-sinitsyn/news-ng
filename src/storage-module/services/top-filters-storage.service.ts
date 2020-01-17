import { Injectable } from '@angular/core';
import { TopArticlesRequestModel } from '@domain';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class TopFiltersStorageService {
  public constructor(
    private readonly localStorageService: LocalStorageService
  ) {
    const topFilters = localStorageService.get(this.namespace);
    if (!topFilters || typeof topFilters !== 'object')
      localStorageService.store(this.namespace, {});
  }

  private readonly namespace: string = 'topFilters';

  public store(name: string, filter: TopArticlesRequestModel): void {
    if (!name || !filter) return;
    const topFilters = this.localStorageService.get(this.namespace);
    topFilters[name] = filter;
    this.localStorageService.store(this.namespace, topFilters);
  }

  public get(name: string): TopArticlesRequestModel {
    const topFilters = this.localStorageService.get(this.namespace);
    return topFilters[name] ? new TopArticlesRequestModel(topFilters[name]) : null;
  }

  public delete(name: string): void {
    const topFilters = this.localStorageService.get(this.namespace);
    delete topFilters[name];
    this.localStorageService.store(this.namespace, topFilters);
  }

  public deleteAll(): void {
    this.localStorageService.store(this.namespace, {});
  }
}