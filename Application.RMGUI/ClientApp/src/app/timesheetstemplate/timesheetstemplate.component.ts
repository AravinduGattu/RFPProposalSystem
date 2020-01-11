import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ReportService } from '../services/reportservice';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-timesheetstemplate',
  templateUrl: './timesheetstemplate.component.html',
  styleUrls: ['./timesheetstemplate.component.css']
})
export class TimesheetstemplateComponent implements OnInit {
  file: File;
  fileToUpload: File = null;
  fileurl: any;
  jsonData: any;
  serviceEndpoint: string;

  constructor(private reportservice: ReportService, private dialog: MatDialog) { }

  ngOnInit() { }

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }
}
