import { Directive } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { RootStateModel } from '@state';

@Directive({ selector: '[newsSpinner]' })
export class SpinnerDirective {
  public constructor(
    private readonly store: Store<RootStateModel>,
    private readonly dialogService: MatDialog
  ) {}

  private readonly subscription: Subscription = new Subscription();
  private dialogRef: MatDialogRef<MatSpinner>;

  public ngOnInit(): void {
    this.subscription.add(
      this.store.select(state => state.ui.spinner).pipe(
        map(spinner => !!spinner),
        distinctUntilChanged()
      ).subscribe(visible => visible ? this.show() : this.hide())
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
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