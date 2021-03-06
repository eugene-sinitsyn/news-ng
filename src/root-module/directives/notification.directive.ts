import { Directive } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { RootConfig } from '../root.config';
import { RootStateModel } from '../state/models/root-state.model';

@Directive({ selector: '[newsNotification]' })
export class NotificationDirective {
  public constructor(
    private readonly store: Store<RootStateModel>,
    private readonly snackbarService: MatSnackBar,
    private readonly translateService: TranslateService,
    private readonly rootConfig: RootConfig,
  ) {}

  private readonly subscription: Subscription = new Subscription();

  public ngOnInit(): void {
    this.subscription.add(
      this.store.select(state => state.ui.notification).pipe(skip(1))
        .subscribe(notification => notification && this.openSnackbar(
          notification.label,
          notification.duration
        ))
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private openSnackbar(label: string, duration?: number): void {
    const message = this.translateService.instant(`notifications.${label}`);
    const snackbarAction = this.translateService.instant('shared.dismiss');
    if (!duration || duration < 0) duration = this.rootConfig.notificationDuration;
    this.snackbarService.open(message, snackbarAction, { duration });
  }
}