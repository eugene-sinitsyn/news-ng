import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { PreferencesStateModel } from '../../state/models/preferences-state.model';

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