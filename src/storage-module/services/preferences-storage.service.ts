import { Injectable } from '@angular/core';
import { PreferencesStateModel } from '@state';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable()
export class PreferencesStorageService {
  public constructor(private readonly localStorageService: LocalStorageService) {
    const preferences = localStorageService.get(this.namespace);
    if (!preferences || typeof preferences !== 'object')
      localStorageService.store(this.namespace, {});
  }

  private readonly namespace: string = 'preferences';

  public store(preferences: PreferencesStateModel): void {
    this.localStorageService.store(this.namespace, preferences);
  }

  public get(): PreferencesStateModel {
    return this.localStorageService.get(this.namespace);
  }

  public delete(): void {
    this.localStorageService.delete(this.namespace);
  }
}