import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicantProfileReviewService } from '../services/ApplicantProfileReviewService';
import { ApplicantProfileReview } from '../models/ApplicantProfileReview';
import { EmployeeNameDropDown } from '../models/EmployeeNameDropDown';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ExcelService } from '../services/ExcelExport';
import { UploadComponent } from '../upload/upload.component';
import { ApplicantprofilereviewInsertpopupComponent } from './applicantprofilereview-insertpopup/applicantprofilereview-insertpopup.component';
import { ApplicantprofilereviewEditpopupComponent } from './applicantprofilereview-editpopup/applicantprofilereview-editpopup.component';
import { ApplicantDropDown } from '../models/ApplicantDropdown';

@Component({
  selector: 'app-applicant-profile-shortlist',
  templateUrl: './applicant-profile-shortlist.component.html',
  styleUrls: ['./applicant-profile-shortlist.component.css']
})
  //applicant_profile_review_id
//panel_name
//applicant_name
//applicant_profile_status
//panel_profile_review

export class ApplicantProfileShortlistComponent implements OnInit {
  applicantProfileReview: ApplicantProfileReview[];
  applicantProfileReviews: ApplicantProfileReview[]=[];
  EditRowId: any = '';
  obj_applicantProfileReview: ApplicantProfileReview;
  applicant_profile_status = '';
  list_applicantProfileReview: ApplicantProfileReview[] = [];
  panelemp: EmployeeNameDropDown[];
  panelapp: ApplicantDropDown[];
  public applicantprofilereviewForm: FormGroup;
  data_Source: MatTableDataSource<ApplicantProfileReview>;
  v_applicantprofileshortlistSearchQuery: string;
  vload = 1;
  v_searchbar = true;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  constructor(private excelService: ExcelService, private dialog: MatDialog, public applicantProfileReviewService: ApplicantProfileReviewService) { }

  ngOnInit() {
    this.LoadEmployeeName();
    this.LoadApplicantName();
    this.LoadPanel();
   this.applicantprofilereviewForm = new FormGroup({
      applicant_profile_review_id: new FormControl(''),
     panel_name: new FormControl('',),
     applicant_name: new FormControl('',),
      applicant_profile_status: new FormControl(''),
      panel_profile_review: new FormControl(''),

    });
  }
  LoadEmployeeName() {
    this.applicantProfileReviewService.EmployeeNameDropdown().subscribe((data: EmployeeNameDropDown[]) => {
      this.panelemp = data;
    });
  }
  LoadApplicantName() {
    this.applicantProfileReviewService.ApplicantDropdown().subscribe((data: ApplicantDropDown[]) => {
      this.panelapp = data;
    });
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.applicantprofilereviewForm.controls[controlName].hasError(errorName);

  }
  openPopup() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    //dialogConfig.height = "70 %";

    this.dialog.open(ApplicantprofilereviewInsertpopupComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadPanel();
      }
    });

  }
  LoadPanel() {
    this.applicantProfileReviewService.GetAllApplicantProfileShortlisted()
      .subscribe((data: ApplicantProfileReview[]) => {
        this.applicantProfileReview = data;
        this.data_Source = new MatTableDataSource(this.applicantProfileReview);

      });
  }

  

  editPopup(row) {
    this.applicantProfileReviewService.populateapplicantprofilereviewForm(row);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    //dialogConfig.height = "60 %";

    this.dialog.open(ApplicantprofilereviewEditpopupComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadPanel();
      }
    });
  }
  m_applicantprofileshortlistSearchQuery() {

    this.v_applicantprofileshortlistSearchQuery = 'SELECT * FROM pact_rmg.view_getallapplicantprofilereviews';

    this.obj_applicantProfileReview = Object.assign({}, this.applicantprofilereviewForm.value);
    if (this.obj_applicantProfileReview.panel_name || this.obj_applicantProfileReview.applicant_name || this.obj_applicantProfileReview.applicant_profile_status ||this.obj_applicantProfileReview.panel_profile_review) {
      this.v_applicantprofileshortlistSearchQuery = this.v_applicantprofileshortlistSearchQuery.concat(' where');
      console.log(this.v_applicantprofileshortlistSearchQuery.length)
    }

    if (this.obj_applicantProfileReview.panel_name) {
      if (this.v_applicantprofileshortlistSearchQuery.length > 49) {
        this.v_applicantprofileshortlistSearchQuery = this.v_applicantprofileshortlistSearchQuery.concat(" or ")
      }
      this.v_applicantprofileshortlistSearchQuery = this.v_applicantprofileshortlistSearchQuery.concat(" Emp_Name like '%" + this.obj_applicantProfileReview.panel_name.trim() + "%' ");
    }
    if (this.obj_applicantProfileReview.applicant_name) {
      if (this.v_applicantprofileshortlistSearchQuery.length > 49) {
        this.v_applicantprofileshortlistSearchQuery = this.v_applicantprofileshortlistSearchQuery.concat(" or ")
      }
      this.v_applicantprofileshortlistSearchQuery = this.v_applicantprofileshortlistSearchQuery.concat(" applicant_name like '%" + this.obj_applicantProfileReview.applicant_name.trim() + "%' ");
    }
    if (this.obj_applicantProfileReview.applicant_profile_status) {
      if (this.v_applicantprofileshortlistSearchQuery.length > 49) {
        this.v_applicantprofileshortlistSearchQuery = this.v_applicantprofileshortlistSearchQuery.concat(" or ")
      }
      this.v_applicantprofileshortlistSearchQuery = this.v_applicantprofileshortlistSearchQuery.concat(" applicant_profile_status like '%" + this.obj_applicantProfileReview.applicant_profile_status.trim() + "%' ");
    }
    if (this.obj_applicantProfileReview.panel_profile_review) {
      if (this.v_applicantprofileshortlistSearchQuery.length > 49) {
        this.v_applicantprofileshortlistSearchQuery = this.v_applicantprofileshortlistSearchQuery.concat(" or ")
      }
      this.v_applicantprofileshortlistSearchQuery = this.v_applicantprofileshortlistSearchQuery.concat(" panel_profile_review like '%" + this.obj_applicantProfileReview.panel_profile_review.trim() + "%' ");
    }
    console.log(this.v_applicantprofileshortlistSearchQuery);

    return this.applicantProfileReviewService.applicantprofileshortlistSearchQuery(this.v_applicantprofileshortlistSearchQuery).subscribe((data: ApplicantProfileReview[]) => {
      this.applicantProfileReview = data;
      this.data_Source = new MatTableDataSource(this.applicantProfileReview);
      this.vload = 0;
      this.data_Source.paginator = this.paginator;
      this.data_Source.sort = this.sort;
      this.v_searchbar = false;
    });

  }
  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
  }

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }


  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.applicantProfileReview, 'ApplicantProfileReview');
  }
  displayedColumns: string[] = ['edit', 'panel_name', 'applicant_name', 'applicant_profile_status', 'panel_profile_review'];

OnResetSearch()
{
  this.applicantprofilereviewForm.reset();
}


}



