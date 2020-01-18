import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { RootStateModel, uiActions } from '@state';
import { ViewConfiguration } from '@view/config';

@Component({
  selector: 'news-notification',
  template: '',
  styles: [':host { display: none; }']
})
export class NotificationComponent implements OnInit, OnDestroy {
  public constructor(
    private readonly store: Store<RootStateModel>,
    private readonly snackbarService: MatSnackBar,
    private readonly translateService: TranslateService,
    private readonly viewConfig: ViewConfiguration,
  ) {}

  private readonly subscription: Subscription = new Subscription();

  public ngOnInit(): void {
    this.subscription.add(this.store
      .select(state => state.ui.notification)
      .pipe(skip(1))
      .subscribe(notification => notification && this.openSnackbar(
        notification.label,
        notification.duration
      )));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private openSnackbar(label: string, duration?: number): void {
    const message = this.translateService.instant(`notifications.${label}`);
    const snackbarAction = this.translateService.instant('shared.dismiss');
    if (!duration || duration < 0) duration = this.viewConfig.notificationDuration;
    this.snackbarService.open(message, snackbarAction, { duration });
  }
}