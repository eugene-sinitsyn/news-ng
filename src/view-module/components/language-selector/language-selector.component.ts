import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LanguageEnum } from '@domain';
import { RootStateModel, preferencesActions } from '@state';

@Component({
  selector: 'news-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelector implements OnInit, OnDestroy {
  public constructor(
    private readonly store: Store<RootStateModel>,
    private readonly formBuilder: FormBuilder
  ) {}

  private subscription: Subscription;
  public readonly LanguageEnum: typeof LanguageEnum = LanguageEnum;
  public control: FormControl;

  public ngOnInit(): void {
    const languageSubscription = this.store
      .select(state => state.preferences.language)
      .subscribe(language => {
        this.subscription = this.setupControl(language);
      });
    languageSubscription.unsubscribe();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private setupControl(language: LanguageEnum): Subscription {
    this.control = this.formBuilder.control(language);
    return this.control.valueChanges.subscribe(language => {
      this.store.dispatch(preferencesActions.storeLanguage({ language }));
    });
  }
}