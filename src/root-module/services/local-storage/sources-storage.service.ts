import { Injectable } from '@angular/core';

import { SourceDetailsModel } from '../../models/source-details.model';
import { RootConfig } from '../../root.config';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class SourcesStorageService {
  public constructor(
    private readonly rootConfig: RootConfig,
    private readonly localStorageService: LocalStorageService
  ) {}

  private readonly namespace: string = 'sources';
  private readonly namespaceTimestamp: string = 'sourcesTimestamp';

  public get isStale(): boolean {
    const timeStamp = this.localStorageService.get(this.namespaceTimestamp);
    if (!timeStamp || !Number.isInteger(timeStamp)) return true;

    const timeElapsedMs = Date.now() - timeStamp;
    return timeElapsedMs > this.rootConfig.sourcesExpirationTimeMs;
  }

  public store(sources: SourceDetailsModel[]): void {
    this.localStorageService.store(this.namespace, sources);
    this.localStorageService.store(this.namespaceTimestamp, Date.now());
  }

  public get(): SourceDetailsModel[] {
    return this.localStorageService.get(this.namespace);
  }
}