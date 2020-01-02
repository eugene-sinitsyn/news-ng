import { Component, Self, Optional, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SourceDetailsModel, CountryEnum, CategoryEnum } from '@domain';
import { RootStateModel, sourcesActions } from '@state';

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
    private readonly store: Store<RootStateModel>
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  private subscription: Subscription;
  private componentInitiaized: boolean = false;
  private busyValue: boolean = false;
  private countryValue: CountryEnum;
  private categoryValue: CategoryEnum;

  public sources: SourceDetailsModel[];

  @Input() public set country(value: CountryEnum) {
    if (this.componentInitiaized) this.reset();
    this.countryValue = value;
  }

  @Input() public set category(value: CategoryEnum) {
    if (this.componentInitiaized) this.reset();
    this.categoryValue = value;
  }

  @ViewChild(MatSelect, { static: true }) public matSelect: MatSelect;

  private get hasOptions(): boolean {
    return this.sources && this.sources.length > 0;
  }

  public get busy(): boolean {
    return this.busyValue;
  }

  public get hint(): string {
    if (this.countryValue && this.categoryValue)
      return `${this.categoryValue} news sources in ${this.countryValue}`;
    else if (this.countryValue) return `News sources in ${this.countryValue}`;
    else if (this.categoryValue) return `${this.categoryValue} news sources`;
    else return '';
  }

  public ngOnInit(): void {
    this.subscription = this.store.select(state => state.sources)
      .subscribe(sources => this.handleSources(sources));
    this.subscription.add(this.store.select(state => state.preferences.language)
      .subscribe(() => this.reset()));
    this.componentInitiaized = true;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  public fetchSources(): void {
    this.busyValue = true;
    this.store.dispatch(sourcesActions.fetchSources({
      country: this.countryValue,
      category: this.categoryValue
    }));
  }

  private handleSources(sources: SourceDetailsModel[]): void {
    this.sources = sources;
    // write value and open mat-select
    // after source options are "change-detected"
    setTimeout(() => {
      if (this.ngControl.value) this.writeValue(this.ngControl.value);
      if (this.busyValue) {
        this.matSelect.open();
        this.busyValue = false;
      }
    });
  }

  private reset(): void {
    const control = this.ngControl.control;
    if (control.value && control.value.length) control.setValue([]);
    if (this.sources && this.sources.length)
      this.store.dispatch(sourcesActions.storeSources({ sources: [] }));
  }

  // MatFormFieldControl implementation:

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
    if (!this.hasOptions) this.fetchSources();
    if (this.matSelect) this.matSelect.onContainerClick();
  }

  // ControlValueAccessor implementation:

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