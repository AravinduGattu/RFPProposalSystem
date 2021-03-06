import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertDialogComponent } from '../dialogs/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openAlertDialog(msg) {

    const dialogConfig = new MatDialogConfig();

    this.dialog.open(AlertDialogComponent, { width: '350px', panelClass: 'confirm-dialog-container', disableClose: true, data: { message: msg } });
  }

  openConfirmationDialog(msg) {

    const dialogConfig = new MatDialogConfig();

    return this.dialog.open(ConfirmationDialogComponent, { width: '500px', panelClass: 'confirm-dialog-container', disableClose: true, data: { message: msg } });

  }
}
