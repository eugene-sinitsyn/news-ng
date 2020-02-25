import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faQuestionCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'news-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  public constructor(
    @Inject(MAT_DIALOG_DATA) public readonly description: string
  ) {}

  public readonly faQuestionCircle: IconDefinition = faQuestionCircle;
}