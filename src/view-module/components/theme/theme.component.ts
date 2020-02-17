import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { RootStateModel } from '@state';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'news-theme',
  template: '',
  styles: [':host { display: none; }']
})
export class ThemeComponent implements OnInit, OnDestroy {
  public constructor(
    private readonly store: Store<RootStateModel>,
    private readonly themeService: ThemeService
  ) {}

  private readonly subscription: Subscription = new Subscription

  public ngOnInit(): void {
    this.subscription.add(
      this.store.select(state => state.preferences.darkTheme).pipe(
          filter(dark => dark !== undefined && dark !== null),
          distinctUntilChanged()
        ).subscribe(dark => this.themeService.switchTheme(dark))
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}