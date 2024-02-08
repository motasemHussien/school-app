import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-student-details-dialog',
  templateUrl: './student-details-dialog.component.html',
  styleUrl: './student-details-dialog.component.scss',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatButtonModule, CommonModule],
})
export class StudentDetailsDialog {
  constructor(
    public dialogRef: MatDialogRef<StudentDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeDialog(event: Event): void {
    event.preventDefault();

    this.dialogRef.close();
  }
}
