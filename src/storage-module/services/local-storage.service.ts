import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  public store(key: string, value: any): void {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  public get(key: string): any {
    try {
      const stringValue = localStorage.getItem(key);
      return JSON.parse(stringValue);
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  }

  public delete(key: string): void {
    localStorage.removeItem(key);
  }

  public deleteAll(): void {
    localStorage.clear();
  }
}