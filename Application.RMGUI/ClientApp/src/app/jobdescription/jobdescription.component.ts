import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobDescriptionService } from '../services/JobDescriptionService';
import { JobDescription } from '../models/JobDescription';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort, MatDialogConfig } from '@angular/material';
import { Jobtitledropdown } from '../models/Jobtitledropdown';
import { ProjectdropdownAttribute } from '../models/ProjectdropdownAttribute';
import { projectdrp_TA } from '../models/projdrp_TA';
import { DatePipe } from '@angular/common'
import { skilldropdown } from '../models/skilldropdown';
import { UploadComponent } from '../upload/upload.component';
import { JobdescriptionInsertPopupComponent } from './jobdescription-insert-popup/jobdescription-insert-popup.component';
import { JobdescriptionEditPopupComponent } from './jobdescription-edit-popup/jobdescription-edit-popup.component';
import { ExcelService } from '../services/ExcelExport';
@Component({
  selector: 'app-jobdescription',
  templateUrl: './jobdescription.component.html',
  styleUrls: ['./jobdescription.component.css']
})
export class JobdescriptionComponent implements OnInit {

  job_grade = '';  // For dropdown --hardcode
  job_type = '';    // For dropdown --hardcode
  jobdescription_status = '';
  salary = '';
  public jobdescriptionForm: FormGroup;
  job: JobDescription[];  // models ts file name--- Fetching
  jobs_des: any;  // Inserting
  obj_job: JobDescription; // For Search query
  list_jobdescriptions: JobDescription[] = [];  // For Search query  
  data_Source: MatTableDataSource<JobDescription>;
  v_jobSearchQuery: string;
  vload = 1;
  v_searchbar = true;
  jobtitledroplist: Jobtitledropdown[];
 
  skilldroplist: skilldropdown[];
 
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  constructor(private jobdescriptionservice: JobDescriptionService, private dialog: MatDialog, public datepipe: DatePipe, public excelService: ExcelService) { }

  ngOnInit() {
    this.LoadJobDescription();
    this.LoadJobtitleDropdown();
    this.LoadskillDropdown();
    this.jobdescriptionForm = new FormGroup({
      job_Posting_code: new FormControl(''),
      job_title: new FormControl(''),
      experience: new FormControl(''),
      worklocation: new FormControl(''),
      job_type: new FormControl(''),     
      skills: new FormControl(''),
      jobdescription_status: new FormControl(''),
      salary: new FormControl(''),
      job_description: new FormControl(''),


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





  m_jobdescriptionSearchQuery() {
    this.v_jobSearchQuery = 'SELECT * FROM pact_rmg.view_getalljobposting';

    this.obj_job = Object.assign({}, this.jobdescriptionForm.value);



    //code to add where
    if (this.obj_job.job_Posting_code || this.obj_job.job_title || this.obj_job.experience || this.obj_job.worklocation || this.obj_job.job_type ||
     this.obj_job.skills || this.obj_job.jobdescription_status ||
      this.obj_job.job_description) {
      this.v_jobSearchQuery = this.v_jobSearchQuery.concat(' where');
      console.log(this.v_jobSearchQuery.length)
    }
    if (this.obj_job.job_Posting_code) {
      if (this.v_jobSearchQuery.length > 50) {
        this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" or ")
      }
      this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" job_Posting_code like '%" + this.obj_job.job_Posting_code.trim() + "%' ");
    }
    if (this.obj_job.job_title) {
      if (this.v_jobSearchQuery.length > 50) {
        this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" or ")
      }
      this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" Design_Description like '%" + this.obj_job.job_title.trim() + "%' ");
    }
    if (this.obj_job.experience) {
      if (this.v_jobSearchQuery.length > 50) {
        this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" or ")
      }
      this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" experience like '%" + this.obj_job.experience.trim() + "%' ");
    }
    if (this.obj_job.worklocation) { 
      if (this.v_jobSearchQuery.length > 50) {
        this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" or ")
      }
      this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" worklocation like '%" + this.obj_job.worklocation.trim() + "%' ");
    }
    if (this.obj_job.job_type) {
      if (this.v_jobSearchQuery.length > 50) {
        this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" or ")
      }
      this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" job_type like '%" + this.obj_job.job_type.trim() + "%' ");
    }

    if (this.obj_job.skills) {
      if (this.v_jobSearchQuery.length > 50) {
        this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" or ")
      }
      this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" skills like '%" + this.obj_job.skills.trim() + "%' ");
    }
    if (this.obj_job.jobdescription_status) {
      if (this.v_jobSearchQuery.length > 50) {
        this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" or ")
      }
      this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" jobdescription_status like '%" + this.obj_job.jobdescription_status.trim() + "%' ");
    }
    if (this.obj_job.salary) {
      if (this.v_jobSearchQuery.length > 50) {
        this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" or ")
      }
      this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" salary like '%" + this.obj_job.salary.trim() + "%' ");
    }
    if (this.obj_job.job_description) {
      if (this.v_jobSearchQuery.length > 50) {
        this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" or ")
      }
      this.v_jobSearchQuery = this.v_jobSearchQuery.concat(" job_description like '%" + this.obj_job.job_description.trim() + "%' ");
    }

    console.log(this.v_jobSearchQuery);

    return this.jobdescriptionservice.jobdescriptionSearchQuery(this.v_jobSearchQuery).subscribe((data: JobDescription[]) => {
      this.list_jobdescriptions = data;
      this.data_Source.data = this.list_jobdescriptions;
      this.vload = 0;
      this.data_Source.paginator = this.paginator;
      this.v_searchbar = false;
    });
  }




  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
  }

  openPopup_des() {
    this.jobdescriptionservice.IntializeForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "45%";
    dialogConfig.height = "70 %";
    this.dialog.open(JobdescriptionInsertPopupComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadJobDescription();
      }
    });
  }



  editPopupdesc(row) {
    var rowElement;
    rowElement = row;
    rowElement.skills = rowElement.skills.split(',');
    this.jobdescriptionservice.populatejobdescriptionForm(rowElement);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "80%";

    this.dialog.open(JobdescriptionEditPopupComponent, dialogConfig).afterClosed().subscribe((result) => {
      if (result = !null) {
        this.LoadJobDescription();
      }
    });
  }


  //editPopupdesc(row) {
  //  var rowElement;
  //  rowElement = row;
  //  rowElement.skills = rowElement.skills.split(',');
  //  this.jobdescriptionservice.populatejobdescriptionForm(rowElement);
  //  const dialogConfig = new MatDialogConfig();
  //  dialogConfig.disableClose = true;
  //  dialogConfig.autoFocus = true;
  //  dialogConfig.width = "50%";
  //  dialogConfig.height = "70%";

  //  this.dialog.open(JobdescriptionEditPopupComponent, dialogConfig).afterClosed().subscribe((result) =>
  //    this.m_jobdescriptionSearchQuery());

  //} 


  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.job, 'Jobs');
  }
  displayedColumns: string[] = ['edit', 'job_Posting_code', 'job_title', 'experience', 'worklocation', 'job_type', 'skills', 'jobdescription_status', 'salary', 'job_description'];

  LoadJobtitleDropdown() {
    this.jobdescriptionservice.GetJobtitleDropdown().subscribe((data: Jobtitledropdown[]) => { this.jobtitledroplist = data; })
  }

  LoadskillDropdown() {
    this.jobdescriptionservice.GetSkillDropdown().subscribe((data: skilldropdown[]) => { this.skilldroplist = data; });
  }

  OnResetSearch() {
    this.jobdescriptionForm.reset();
  }
}
