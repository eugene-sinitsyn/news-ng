import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { RootStateModel } from '../state/models/root-state.model';
import { LanguageEnum } from '../enums/language.enum';

@Directive({ selector: '[newsLanguageSwitcher]' })
export class LanguageSwitcherDirective implements OnInit, OnDestroy {
  public constructor(
    private readonly store: Store<RootStateModel>,
    private readonly translateService: TranslateService
  ) {
    translateService.setDefaultLang(LanguageEnum.english);
  }

  private readonly subscription: Subscription = new Subscription();

  public ngOnInit(): void {
    this.subscription.add(
      this.store.select(state => state.preferences.language)
        .pipe(distinctUntilChanged(), filter(language => !!language))
        .subscribe(language => this.translateService.use(language))
    )
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}