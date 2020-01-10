import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoledialogComponent } from '../../roles/roledialog/roledialog.component';
import { AssesmentService } from '../../services/AssesmentService';
import { ExcelService } from '../../services/ExcelExport';
import { NotificationService } from '../../services/NotificationService';
import { Assesment } from '../../models/Assesment';

@Component({
  selector: 'app-assessment-add-popup',
  templateUrl: './assessment-add-popup.component.html',
  styleUrls: ['./assessment-add-popup.component.css']
})
export class AssessmentAddPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<RoledialogComponent>,
    private assesmentService: AssesmentService, private excelService: ExcelService, private notificationservice: NotificationService) { }

  asmts: Assesment[] = [];
  public asmtslist: Assesment[];
  AssessmentForm: FormGroup;
  EditRowId: any = '';
  modeofinterview = '';
  status = '';
  selected: any;
  selectedoption: any;
  selectedoption1: any;
  selectedoption2: any;
  ngOnInit() {
    this.dialogRef.updateSize('70%', '60%');
    
    this.AssessmentForm = new FormGroup({

      applicant_id: new FormControl('', [Validators.required] ),
      asmt_round: new FormControl('', [Validators.required]),
      assessment_type: new FormControl('', [Validators.required] ),
      skillset: new FormControl('', [Validators.required] ),
      mode_of_interview: new FormControl('', [Validators.required] ),
      rating: new FormControl('', [Validators.required] ),
      interviwed_by: new FormControl('', [Validators.required] ),
      remarks: new FormControl('', [Validators.required] ),
      assessment_date: new FormControl('', [Validators.required] ),
      promoted: new FormControl('', [Validators.required]),
      
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.AssessmentForm.controls[controlName].hasError(errorName);

  }


  onSubmit() {
    if (this.AssessmentForm.valid) {
      this.asmts = Object.assign({}, this.AssessmentForm.value);
      return this.assesmentService.AddAssesments(this.asmts).subscribe(
        result => {
          console.log(result);
          this.AssessmentForm.reset();
          this.notificationservice.success('Submitted Succesfully');
          this.close();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  close() {
    this.AssessmentForm.reset();
    this.assesmentService.InitializeForm();
    this.dialogRef.close();
  }

  onClear() {
    this.AssessmentForm.reset();

    this.notificationservice.success('Cleared Succesfully');
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.asmtslist, 'Assesment');
  }


}
