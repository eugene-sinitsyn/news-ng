import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { RootStateModel } from '@state';

@Component({
  selector: 'news-spinner',
  template: '',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  public constructor(
    private readonly store: Store<RootStateModel>,
    private readonly dialogService: MatDialog
  ) {}

  private subscription: Subscription;
  private dialogRef: MatDialogRef<MatSpinner>;

  public ngOnInit(): void {
    this.subscription = this.store
      .select(state => state.ui.spinner)
      .pipe(map(spinner => !!spinner), distinctUntilChanged())
      .subscribe(visible => visible ? this.show() : this.hide());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  private show(): void {
    this.hide();
    this.dialogRef = this.dialogService
      .open(MatSpinner, { disableClose: true });
  }

  private hide(): void {
    if (!this.dialogRef) return;
    this.dialogRef.close();
    this.dialogRef = null;
  }
}