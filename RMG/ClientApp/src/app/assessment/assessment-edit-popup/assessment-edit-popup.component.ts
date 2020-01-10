import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AssesmentService } from '../../services/AssesmentService';
import { ExcelService } from '../../services/ExcelExport';
import { NotificationService } from '../../services/NotificationService';
import { Assesment } from '../../models/Assesment';
import { AsesmtApplicantDrpDwn } from '../../models/AsesmtApplicantDrpDwn';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment-edit-popup',
  templateUrl: './assessment-edit-popup.component.html',
  styleUrls: ['./assessment-edit-popup.component.css']
})
export class AssessmentEditPopupComponent implements OnInit {

  constructor(public assesmentService: AssesmentService, private excelService: ExcelService, private _formBuilder: FormBuilder, private notificationservice: NotificationService, private router: Router) { }
 
  asmts: Assesment[] = [];
  data_Source: MatTableDataSource<Assesment>;
  asesmtemplist: AsesmtApplicantDrpDwn[];
  public asmtslist: Assesment[];
  AssessmentForm: FormGroup;
  editable;
  mode_of_interview = '';
  status = '';
  selected: any;
  selectedoption: any;
  selectedoption1: any;
  selectedoption2: any;
  isLinear = false;
  form: FormArray;
  title = 'Assessment';
  stepper: [];

  ngOnInit() {

    this.AssessmentForm = this._formBuilder.group({
      form: this._formBuilder.array([this.init()])
    }) 

    this.addItem();
    
   

    this.LoadEmployeeDrop();
    
    this.assesmentService.LoadAssesmentDetails();
    
  }

  //public hasError = (controlName: string, errorName: string) => {
  //  return this.assesmentService.AssessmentForm.controls[controlName].hasError(errorName);
  //}
  LoadEmployeeDrop() { this.assesmentService.GetAsesmntEmployeeDrpDwn().subscribe((data: AsesmtApplicantDrpDwn[]) => { this.asesmtemplist = data; }); }
  
  
  onSubmit() {
    if (this.assesmentService.AssessmentForm.valid) {
      this.asmts = Object.assign({}, this.assesmentService.AssessmentForm.value);
      return this.assesmentService.AddAssesments(this.asmts).subscribe(
        result => {
          console.log(result);
          this.assesmentService.AssessmentForm.reset();
          this.notificationservice.success('Submitted Succesfully');
        },
        err => {
          console.log(err);
        }
      );
    }
  }
 

  

  onClear() {
    this.AssessmentForm.reset();

    this.notificationservice.success('Cleared Succesfully');
  }


 
  init() {
    return this._formBuilder.group({
      applicant_code: new FormControl('', [Validators.required]),
      applicant_firstname: new FormControl('', [Validators.required]),
      assessment_type: new FormControl('', [Validators.required]),
      applicant_lastname: new FormControl('', [Validators.required]),
      mode_of_interview: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required]),
      interviwed_by: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),
      assessment_date: new FormControl('', [Validators.required]),
      promoted: new FormControl('', [Validators.required]),
      educational_details: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required]),
      previous_company: new FormControl('', [Validators.required]),
      employment_type: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email_id: new FormControl('', [Validators.required]),
    })
  }
  
  addItem() {
    this.form = this.AssessmentForm.get('form') as FormArray;
    this.form.push(this.init());
  }

  OnReset() {
    this.AssessmentForm.reset();
  }
  navigateBack() {
    this.router.navigate(['/assessment']);
  }
}
