import { Component, Self, Optional, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { TranslateService } from '@ngx-translate/core';
import { MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest, BehaviorSubject } from 'rxjs';
import { SourceDetailsModel, CountryEnum, CategoryEnum, LanguageEnum } from '@domain';
import { RootStateModel } from '@state';

@Component({
  selector: 'news-sources-selector',
  templateUrl: './sources-selector.component.html',
  styleUrls: ['./sources-selector.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: SourcesSelectorComponent }]
})
export class SourcesSelectorComponent implements 
  MatFormFieldControl<SourceDetailsModel[]>,
  ControlValueAccessor,
  OnInit,
  OnDestroy {

  public constructor(
    @Optional() @Self() public ngControl: NgControl,
    private readonly store: Store<RootStateModel>,
    private readonly translateService: TranslateService
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  @Input() public set country(value: CountryEnum) {
    this.country$.next(value);
  }
  @Input() public set category(value: CategoryEnum) {
    this.category$.next(value);
  }

  @ViewChild(MatSelect, { static: true }) public matSelect: MatSelect;

  private readonly subscription: Subscription = new Subscription();
  private country$: BehaviorSubject<CountryEnum> =
    new BehaviorSubject<CountryEnum>(null);
  private category$: BehaviorSubject<CategoryEnum> =
    new BehaviorSubject<CategoryEnum>(null);
  
  public sources: SourceDetailsModel[];
  public hint: string = '';

  public ngOnInit(): void {
    this.subscription.add(
      combineLatest(
        this.store.select(state => state.sources),
        this.store.select(state => state.preferences.language),
        this.country$,
        this.category$
      ).subscribe(([sources, language, country, category]) => {
        this.hint = this.getHint(country, category);
        this.sources = sources && sources.filter(
          source => this.fitsCriteria(source, language, country, category)
        );
        // update value after sources are "change detected"
        setTimeout(() => this.writeValue(this.ngControl.value));
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getHint(country: CountryEnum, category: CategoryEnum): string {
    if (!country && !category) return '';

    let label: string;
    if (!category) label = 'sources-hint-country';
    else if (!country) label = 'sources-hint-category';
    else label = 'sources-hint-category-country';

    return this.translateService.instant(`filter.${label}`, {
      category: this.translateService.instant(`categories.${category}`),
      country: this.translateService.instant(`countries.${country}`)
    });
  }

  private fitsCriteria(
    source: SourceDetailsModel,
    language: LanguageEnum,
    country: CountryEnum,
    category: CategoryEnum
  ): boolean {
    return source.language === language &&
      (!country || source.country === country) &&
      (!category || source.category === category);
  }

  // MatFormFieldControl:

  public set value(value: any) {
    if (this.matSelect) this.matSelect.value = value;
  }
  public get value(): any {
    return this.matSelect ? this.matSelect.value : null;
  }

  public get stateChanges(): Observable<void> {
    return this.matSelect ? this.matSelect.stateChanges : null;
  }

  public get id(): string {
    return this.matSelect ? this.matSelect.id : null;
  }

  public get placeholder(): string {
    return this.matSelect ? this.matSelect.placeholder : null;
  }

  public get focused(): boolean {
    return this.matSelect ? this.matSelect.focused : false;
  }

  public get empty(): boolean {
    return this.matSelect ? this.matSelect.empty : true;
  }

  public get shouldLabelFloat(): boolean {
    return this.matSelect ? this.matSelect.shouldLabelFloat : true;
  }

  public get required(): boolean {
    return this.matSelect ? this.matSelect.required : false;
  }

  public get disabled(): boolean {
    return this.matSelect ? this.matSelect.disabled : false;
  }

  public get errorState(): boolean {
    return this.matSelect ? this.matSelect.errorState : false;
  }

  public get controlType(): string {
    return this.matSelect ? this.matSelect.controlType : null;
  }

  public setDescribedByIds(ids: string[]): void {
    if (this.matSelect) this.matSelect.setDescribedByIds(ids);
  }

  public onContainerClick(event: MouseEvent): void {
    if (this.matSelect) this.matSelect.onContainerClick();
  }

  // ControlValueAccessor:

  public writeValue(value: any): void {
    if (this.matSelect) this.matSelect.writeValue(value);
  }

  public registerOnChange(handler: any): void {
    if (this.matSelect) this.matSelect.registerOnChange(handler);
  }

  public registerOnTouched(handler: any): void {
    if (this.matSelect) this.matSelect.registerOnTouched(handler);
  }

  public setDisabledState(isDisabled: boolean): void {
    if (this.matSelect) this.matSelect.setDisabledState(isDisabled);
  }
}