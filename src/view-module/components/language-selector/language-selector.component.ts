import { Component, OnInit, OnDestroy, HostBinding } from "@angular/core";
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageEnum, UtilitiesService } from '@domain';
import { RootStateModel, preferencesActions } from '@state';
import { ViewConfiguration } from '@view/config';

@Component({
  selector: 'news-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  public constructor(
    public readonly viewConfig: ViewConfiguration,
    private readonly store: Store<RootStateModel>,
    private readonly formBuilder: FormBuilder,
    private readonly translateService: TranslateService
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
      this.translateService.use(language);
      this.store.dispatch(preferencesActions.switchLanguage({ language }));
    });
  }
}