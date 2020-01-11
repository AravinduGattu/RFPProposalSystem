import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApplicantProfileReviewService } from '../../services/ApplicantProfileReviewService';
import { NotificationService } from '../../services/NotificationService';
import { ApplicantProfileReview } from '../../models/ApplicantProfileReview';
import { EmployeeNameDropDown } from '../../models/EmployeeNameDropDown';
import { ApplicantDropDown } from '../../models/ApplicantDropdown';

@Component({
  selector: 'app-applicantprofilereview-insertpopup',
  templateUrl: './applicantprofilereview-insertpopup.component.html',
  styleUrls: ['./applicantprofilereview-insertpopup.component.css']
})
export class ApplicantprofilereviewInsertpopupComponent implements OnInit {
  applicantProfileReview: ApplicantProfileReview[];
  applicantProfileReviews: ApplicantProfileReview[] = [];
  //EditRowId: any = '';
  applicant_profile_status = '';
  panelemp: EmployeeNameDropDown[];
  panelapp: ApplicantDropDown[];
  title='ADD PROFILE REVIEW'
  public applicantprofilereviewForm: FormGroup;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ApplicantprofilereviewInsertpopupComponent>, public applicantProfileReviewService: ApplicantProfileReviewService, private notificationservice: NotificationService) { }

  ngOnInit() {

    this.LoadEmployeeName();
    this.LoadApplicantName();
    this.applicantprofilereviewForm = new FormGroup({
      applicant_profile_review_id: new FormControl(''),
      panel_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z, ]+$')]),
      applicant_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z, ]+$')]),
      applicant_profile_status: new FormControl('', [Validators.required]),
      panel_profile_review: new FormControl('',[Validators.required]),

    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.applicantprofilereviewForm.controls[controlName].hasError(errorName);

  }
  OnSubmit() {
    if (this.applicantprofilereviewForm.valid) {

      this.applicantProfileReviews = Object.assign({}, this.applicantprofilereviewForm.value);
      return this.applicantProfileReviewService.AddApplicantProfileReview(this.applicantProfileReviews).subscribe(
        result => {
          console.log(result);
          this.dialogRef.close(this.applicantprofilereviewForm.value);
          this.applicantprofilereviewForm.reset();
          this.notificationservice.success('Submitted Succesfully');
          this.Close();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  Close() {
    this.applicantprofilereviewForm.reset();
    this.dialogRef.close();
  }

  Clear() {
    this.applicantprofilereviewForm.reset();
    //this.customerService.IntializeForm();
    //this.notificationservice.success(':: Cleared successfully');
  }
  LoadEmployeeName() {
    this.applicantProfileReviewService.EmployeeNameDropdown().subscribe((data: EmployeeNameDropDown[]) => {
      this.panelemp = data;
    });
  }
  LoadPanel() {
    this.applicantProfileReviewService.GetAllApplicantProfileShortlisted()
      .subscribe((data: ApplicantProfileReview[]) => {
        this.applicantProfileReview = data;
      });
  }
  LoadApplicantName() {
    this.applicantProfileReviewService.ApplicantDropdown().subscribe((data: ApplicantDropDown[]) => {
      this.panelapp = data;
    });
  }

}


