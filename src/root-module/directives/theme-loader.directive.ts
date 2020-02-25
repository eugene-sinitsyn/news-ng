import { Directive, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { RootConfig } from '../root.config';
import { RootStateModel } from '../state/models/root-state.model';

@Directive({ selector: '[newsThemeLoader]' })
export class ThemeLoaderDirective {
  public constructor(
    private rootConfig: RootConfig,
    private readonly store: Store<RootStateModel>,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  private readonly subscription: Subscription = new Subscription
  private readonly themeStylesElementId: string = 'theme-styles';

  public ngOnInit(): void {
    this.subscription.add(
      this.store.select(state => state.preferences.darkTheme).pipe(
          filter(dark => dark !== undefined && dark !== null),
          distinctUntilChanged()
        ).subscribe(dark => this.changeThemeStylesUrl(dark))
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private changeThemeStylesUrl(dark: boolean): void {
    const stylesUrl = dark
      ? this.rootConfig.darkThemeStylesUrl
      : this.rootConfig.lightThemeStylesUrl;
    let themeStylesElement: HTMLLinkElement =
      this.document.getElementById(this.themeStylesElementId) as HTMLLinkElement;

    if (themeStylesElement) {
      themeStylesElement.href = stylesUrl;
    } else {
      themeStylesElement = this.document.createElement('link');
      themeStylesElement.id = this.themeStylesElementId;
      themeStylesElement.rel = 'stylesheet';
      themeStylesElement.href = stylesUrl;
      this.document.head.appendChild(themeStylesElement);
    }
  }
}