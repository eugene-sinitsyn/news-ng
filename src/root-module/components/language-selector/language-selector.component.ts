import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { LanguageEnum } from '../../enums/language.enum';
import { RootConfig } from '../../root.config';
import { UtilitiesService } from '../../services/utilities.service';
import { preferencesActions } from '../../state/actions/preferences.actions';
import { RootStateModel } from '../../state/models/root-state.model';

@Component({
  selector: 'news-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  public constructor(
    public readonly rootConfig: RootConfig,
    private readonly store: Store<RootStateModel>,
    private readonly formBuilder: FormBuilder
  ) {}

  private readonly subscription: Subscription = new Subscription();

  public readonly LanguageEnum: typeof LanguageEnum = LanguageEnum;
  public readonly languages: string[] = UtilitiesService.enumToList(LanguageEnum);

  @HostBinding('class.menu-action-border') public readonly borderClass: boolean = true;
  @HostBinding('class.focused') public focusedClass: boolean = false;
  public control: FormControl;

  public ngOnInit(): void {
    const languageSubscription = this.store
      .select(state => state.preferences.language)
      .subscribe(language => {
        this.subscription.add(this.setupControl(language));
      });
    languageSubscription.unsubscribe();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public toggleFocusedClass(focused: boolean): void {
    this.focusedClass = focused;
  }

  private setupControl(language: LanguageEnum): Subscription {
    this.control = this.formBuilder.control(language);
    return this.control.valueChanges.subscribe(language => {
      this.store.dispatch(preferencesActions.storeLanguage({ language }));
    });
  }
}