import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { Assesment } from '../models/Assesment';
import { SelectionModel } from '@angular/cdk/collections';
import { ExcelService } from '../services/ExcelExport';
import { DatePipe } from '@angular/common';
import { DialogService } from '../services/dialog.service';
import { AssesmentService } from '../services/AssesmentService';
import { AssessmentEditPopupComponent } from './assessment-edit-popup/assessment-edit-popup.component';
import { AssessmentAddPopupComponent } from './assessment-add-popup/assessment-add-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  asesmts: Assesment[];//var
  public assesment: Assesment[];//var
  EditRowId: any = '';//var
  AssessmentForm: FormGroup;//var
  v_assesmentSearchQuery: string;//var
  obj_asesmts: Assesment;//var
  list_asesmts: Assesment[] = [];
  searchbtn = true;
  data_Source: MatTableDataSource<Assesment>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  vload = 1;
  constructor(private assesmentService: AssesmentService, private excelService: ExcelService, private dialog: MatDialog, private dialogService: DialogService, public datepipe: DatePipe, private router: Router) { }

  ngOnInit() {
   
    this.AssessmentForm = new FormGroup({
      applicant_code: new FormControl(''),
      applicant_name: new FormControl(''),
      educational_details: new FormControl(''),
      experience: new FormControl(''),
      previous_company: new FormControl(''),
      employment_type: new FormControl(''),
      skills: new FormControl(''),
      phone: new FormControl(''),
      email_id: new FormControl(''),
    });
    this.LoadAssesmentDetails();
   

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.AssessmentForm.controls[controlName].hasError(errorName);

  }


  //To Retrieve all the Employee details
  LoadAssesmentDetails() {
    this.assesmentService.GetAllAssesments()
      .subscribe((data: Assesment[]) => {
        this.assesment = data;
        this.data_Source = new MatTableDataSource<Assesment>(this.assesment);
        this.data_Source.sort = this.sort;
        this.data_Source.paginator = this.paginator;
      });
  }
  
  m_assessmentSearchQuery() {
    this.v_assesmentSearchQuery = 'SELECT * FROM pact_rmg.view_getallasesmntapplicant';
    this.obj_asesmts = Object.assign({}, this.AssessmentForm.value);
    console.log(this.v_assesmentSearchQuery.length);
   
   
    if (this.obj_asesmts.applicant_code || this.obj_asesmts.applicant_name || this.obj_asesmts.educational_details ||
      this.obj_asesmts.experience || this.obj_asesmts.previous_company || this.obj_asesmts.employment_type || this.obj_asesmts.skills || this.obj_asesmts.phone ||
      this.obj_asesmts.promoted || this.obj_asesmts.email_id ) {
      this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(' where');
      console.log(this.v_assesmentSearchQuery.length)
    }
    if (this.obj_asesmts.applicant_code) {
      if (this.v_assesmentSearchQuery.length > 49) {
        this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" or ")
      }
      this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" applicant_code  like '%" + this.obj_asesmts.applicant_code.trim() + "%' ");
    }
    if (this.obj_asesmts.applicant_name) {
      if (this.v_assesmentSearchQuery.length > 49) {
        this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" or ")
      }
      this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" applicant_name like '%" + this.obj_asesmts.applicant_name.trim() + "%' ");
    }
    if (this.obj_asesmts.educational_details) {
      if (this.v_assesmentSearchQuery.length > 49) {
        this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" or ")
      }
      this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" educational_details like '%" + this.obj_asesmts.educational_details.trim() + "%' ");
    }
    if (this.obj_asesmts.experience) {
      if (this.v_assesmentSearchQuery.length > 49) {
        this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" or ")
      }
      this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" experience like '%" + this.obj_asesmts.experience.trim() + "%' ");
    }
    if (this.obj_asesmts.previous_company) {
      if (this.v_assesmentSearchQuery.length > 49) {
        this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" or ")
      }
      this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" previous_company like '%" + this.obj_asesmts.previous_company.trim() + "%' ");
    }
    if (this.obj_asesmts.employment_type) {
      if (this.v_assesmentSearchQuery.length > 49) {
        this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" or ")
      }
      this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" employment_type like '%" + this.obj_asesmts.employment_type.trim() + "%' ");
    }
    if (this.obj_asesmts.skills) {
      if (this.v_assesmentSearchQuery.length > 49) {
        this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" or ")
      }
      this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" skills like '%" + this.obj_asesmts.skills.trim() + "%' ");
    }
    if (this.obj_asesmts.phone) {
      if (this.v_assesmentSearchQuery.length > 49) {
        this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" or ")
      }
      this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" phone like '%" + this.obj_asesmts.phone.trim() + "%' ");
    }

   
    if (this.obj_asesmts.email_id) {
      if (this.v_assesmentSearchQuery.length > 49) {
        this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" or ")
      }
      this.v_assesmentSearchQuery = this.v_assesmentSearchQuery.concat(" email_id like '%" + this.obj_asesmts.email_id.trim() + "%' ");
    }
   
     console.log(this.v_assesmentSearchQuery)

    return this.assesmentService.assesmentSearchQuery(this.v_assesmentSearchQuery).subscribe((data: Assesment[]) => {
      this.assesment = data;
      this.data_Source.data = this.assesment;
      this.vload = 0;
      this.data_Source.paginator = this.paginator;
      this.searchbtn = false;
    });
  }

  onSearch() {
    this.searchbtn = !this.searchbtn;
  }

  onEdit(row) {
    this.router.navigate(['assessment/assesedit']);
    this.assesmentService.populateValues(row);
  }
  exportAsXLSX(): void {

    var excelData = [];

    for (let data of this.assesment) { //this.employee is the object taken from Loadallemployees method

      excelData.push({
        'Applicant Code': data.applicant_code,

        'Applicant Name': data.applicant_name,

        'Education Details': data.educational_details,

        'Experience': data.experience,

        'Previous Company': data.previous_company,

        'Employment Type': data.employment_type,

        'Skills': data.skills,

        'Phone': data.phone,

        'Email ID': data.email_id,
        
      })

    }

    this.excelService.exportAsExcelFile(excelData, 'Assesment')

  }

  displayedColumns: string[] = ['edit', 'applicant_code', 'applicant_name', 'educational_details', 'experience', 'previous_company', 'employment_type', 'skills', 'phone', 'email_id'];
  selection = new SelectionModel<Assesment>(true, []);

  OnResetSearch()
  {
    this.AssessmentForm.reset();
  }
}
