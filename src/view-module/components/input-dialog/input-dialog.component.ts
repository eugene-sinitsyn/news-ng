import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'news-input-dialog',
  templateUrl: './input-dialog.component.html'
})
export class InputDialogComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly title: string,
    formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({ value: [''] });
  }

  public readonly formGroup: FormGroup;

  public get value(): string {
    if (!this.formGroup) return null;
    const value = this.formGroup.get('value').value;
    return value && value.trim();
  }

  public trySubmit(): void {
    if (this.value) this.dialogRef.close(this.value);
  }
}