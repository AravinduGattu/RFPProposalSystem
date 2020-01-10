import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertDialogComponent } from '../dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { RRFChildDialogComponent } from '../resourcerequestform/rrfchild-dialog/rrfchild-dialog.component';
import { AssignprojacceptformComponent } from '../resourcerequestform/assignprojacceptform/assignprojacceptform.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }
  openAlertDialog(msg) {
    this.dialog.open(AlertDialogComponent, { width: '350px', height: '180px', panelClass: 'confirm-dialog-container', disableClose: true, data: { message: msg } });
  }
  openConfirmDialog(msg) {
    return this.dialog.open(ConfirmDialogComponent, { width: '350px', height: '180px', panelClass: 'confirm-dialog-container', disableClose: true, data: { message: msg } });
    }

  openRRFDialog(msg) {
    this.dialog.open(RRFChildDialogComponent, { width: '80%', height: '85%', panelClass: 'confirm-dialog-container', disableClose: true, data: { id: msg } });
  }

  openAcceptDialog(msg) {
    this.dialog.open(AssignprojacceptformComponent, { width: '80%', height: '85%', panelClass: 'confirm-dialog-container', disableClose: true, data: { id: msg } });
  }

}
