import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort, MatDialogConfig, MatDialogRef } from '@angular/material';
import { JobDescription } from '../../models/JobDescription';
import { Jobtitledropdown } from '../../models/Jobtitledropdown';
import { projectdrp_TA } from '../../models/projdrp_TA';
import { skilldropdown } from '../../models/skilldropdown';
import { JobDescriptionService } from '../../services/JobDescriptionService';
import { NotificationService } from '../../services/NotificationService';

@Component({
  selector: 'app-jobdescription-insert-popup',
  templateUrl: './jobdescription-insert-popup.component.html',
  styleUrls: ['./jobdescription-insert-popup.component.css']
})
export class JobdescriptionInsertPopupComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  job_grade = '';  // For dropdown --hardcode
  job_type = '';    // For dropdown --hardcode
  jobdescription_status = '';
  salary = '';

  public jobdescriptionForm: FormGroup;
  title = 'ADD JOBPOST'
  job: JobDescription[];  // models ts file name--- Fetching
  jobs_des: any; // Inserting  ---main and primary   // changed
   skilldroplist: skilldropdown[];

 

  obj_job: JobDescription; // For Search query
  list_jobdescriptions: JobDescription[] = [];  // For Search query
  data_Source: MatTableDataSource<JobDescription>;
  v_jobSearchQuery: string;
  vload = 1;
  v_searchbar = false;
  isShow: boolean;  //scroll
  topPosToStartShowing = 100; // Scroll
  jobtitledroplist: Jobtitledropdown[];
  projectnamedroplist: projectdrp_TA[];
 
 
  constructor(private jobdescriptionservice: JobDescriptionService, private dialog: MatDialog, public dialogRef: MatDialogRef<JobdescriptionInsertPopupComponent>, private notificationservice: NotificationService) { }

  
  ngOnInit() {
    this.LoadskillDropdown();
    this.LoadJobDescription();
    this.LoadJobtitleDropdown();
   
    this.jobdescriptionForm = new FormGroup({
      job_Posting_code: new FormControl('', [Validators.required]),
      job_title: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required]),
      worklocation: new FormControl('', [Validators.required]),     
      job_type: new FormControl('', [Validators.required]),   
      skills: new FormControl('', [Validators.required]),     
      salary: new FormControl('', [Validators.required]),
      job_description: new FormControl('', [Validators.required]),

    });

  } 
    
  
  public hasError = (controlName: string, errorName: string) => {
    return this.jobdescriptionForm.controls[controlName].hasError(errorName);
  }

  
  LoadJobDescription() {
    this.jobdescriptionservice.GetAllJobDescrption()
      .subscribe((data: JobDescription[]) => {
        this.job = data;
        this.data_Source = new MatTableDataSource(this.job);
      });
  }


  OnSubmit() {

    if (this.jobdescriptionForm.valid) {
      this.jobs_des = Object.assign({}, this.jobdescriptionForm.value);
      this.jobs_des.skills = this.jobs_des.skills.toString(); //changed
      return this.jobdescriptionservice.AddJobDescription(this.jobs_des).subscribe(
        result => {
          console.log(result);
          this.dialogRef.close(this.jobdescriptionForm.value);
          this.jobdescriptionForm.reset();
          this.notificationservice.success('Submitted Succesfully');
          this.onClose();
        },
        err => {
          console.log(err);
        }
      );
    }
  }


  
  onClose() {
    this.jobdescriptionForm.reset();
    this.dialogRef.close();
  }

  Clear() {
    this.jobdescriptionForm.reset();
  }
  LoadJobtitleDropdown() {
    this.jobdescriptionservice.GetJobtitleDropdown().subscribe((data: Jobtitledropdown[]) => { this.jobtitledroplist = data; });
  }
  LoadskillDropdown() {
    this.jobdescriptionservice.GetSkillDropdown().subscribe((data: skilldropdown[]) => { this.skilldroplist = data; });
  }
 
 
}
