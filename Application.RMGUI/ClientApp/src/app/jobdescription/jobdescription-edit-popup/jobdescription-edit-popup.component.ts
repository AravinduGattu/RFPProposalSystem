import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobDescription } from '../../models/JobDescription';
import { Jobtitledropdown } from '../../models/Jobtitledropdown';
import { projectdrp_TA } from '../../models/projdrp_TA';
import { JobDescriptionService } from '../../services/JobDescriptionService';
import { NotificationService } from '../../services/NotificationService';
import { skilldropdown } from '../../models/skilldropdown';

@Component({
  selector: 'app-jobdescription-edit-popup',
  templateUrl: './jobdescription-edit-popup.component.html',
  styleUrls: ['./jobdescription-edit-popup.component.css']
})
export class JobdescriptionEditPopupComponent implements OnInit {
  job_grade = '';  // For dropdown --hardcode
  job_type = '';    // For dropdown --hardcode
  jobdescription_status = '';
  salary = '';
  title = 'EDIT JOBPOST'
  public jobdescriptionForm: FormGroup;
  job: JobDescription[];  // models ts file name--- Fetching
  jobs_des: any; // Inserting  ---main and primary

  //job_sec: JobDescription[] = [];   // insertig --secondary
  skilldroplist: skilldropdown[];
  data_Source: MatTableDataSource<JobDescription>;
  jobtitledroplist: Jobtitledropdown[];
  
  projectnamedroplist: projectdrp_TA[];
  constructor(public jobdescriptionservice: JobDescriptionService, private dialog: MatDialog, public dialogRef: MatDialogRef<JobdescriptionEditPopupComponent>, private notificationservice: NotificationService) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

     ngOnInit() {
       this.LoadJobtitleDropdown();
       this.LoadskillDropdown();
       this.LoadJobDescription();
   
    this.jobdescriptionForm = new FormGroup({
      job_Posting_code: new FormControl('', [Validators.required]),
      job_title: new FormControl('', [Validators.required]),     
      experience: new FormControl('', [Validators.required]),
      worklocation: new FormControl('', [Validators.required]),
      job_type: new FormControl('', [Validators.required]),    
      skills: new FormControl('', [Validators.required]),
      jobdescription_status: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      job_description: new FormControl('', [Validators.required]),

    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.jobdescriptionForm.controls[controlName].hasError(errorName);

  }

  onUpdate() {
    if (this.jobdescriptionservice.jobdescriptionForm.valid) {
      this.jobs_des = Object.assign({}, this.jobdescriptionservice.jobdescriptionForm.value);

      this.jobs_des.skills = this.jobs_des.skills.toString();  //  changed

      return this.jobdescriptionservice.UpdateJobDescription(this.jobs_des).subscribe(
        result => {
          console.log(result);
          this.dialogRef.close(this.jobdescriptionForm.value);
          this.jobdescriptionForm.reset();
          this.notificationservice.success(':: Submitted successfully');
          this.LoadJobDescription();          
          this.onClose();
        },
        err => {
          console.log(err);
        }
      );
    }
  }


  
  
  LoadJobDescription() {
    this.jobdescriptionservice.GetAllJobDescrption()
      .subscribe((data: JobDescription[]) => {
        this.job = data;
        this.data_Source = new MatTableDataSource<JobDescription>(this.job);
        this.data_Source.paginator = this.paginator;
      });
  }
  onClose() {
    this.jobdescriptionForm.reset();
    this.dialogRef.close();
  }
  onCancel() {
    this.jobdescriptionForm.reset();
    this.dialogRef.close();
  }
  LoadJobtitleDropdown() {
    this.jobdescriptionservice.GetJobtitleDropdown().subscribe((data: Jobtitledropdown[]) => { this.jobtitledroplist = data; });
  }
  
  LoadskillDropdown() {
    this.jobdescriptionservice.GetSkillDropdown().subscribe((data: skilldropdown[]) => { this.skilldroplist = data; });
  }
 
}
