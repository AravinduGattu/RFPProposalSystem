import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort, MatDialogConfig } from '@angular/material';
import { DatePipe } from '@angular/common'
import { UploadComponent } from '../upload/upload.component';
import { ExcelService } from '../services/ExcelExport';
import { Applicant } from '../models/Applicant';
import { ApplicantService } from '../services/ApplicantServicets';
@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {

  public applicantForm: FormGroup;
  app:Applicant[];  // models ts file name--- Fetching
   app_pro: any;  // Inserting
  obj_app: Applicant; // For Search query
  list_applicants: Applicant[] = [];  // For Search query  
  data_Source: MatTableDataSource<Applicant>;
  v_appSearchQuery: string;
  vload = 1;
  v_searchbar = true;
  
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  constructor(private applicantService: ApplicantService, private dialog: MatDialog, public datepipe: DatePipe, public excelService: ExcelService) { }

  ngOnInit() {
    this.Loadapplicant();
   
    this.applicantForm = new FormGroup({
      applicant_code: new FormControl(''),
      applicant_name: new FormControl(''),
      
      gender: new FormControl(''),
      date_of_birth: new FormControl(''),
      marital_status: new FormControl(''),
      educational_details: new FormControl(''),
      experience : new FormControl(''),
      previous_company: new FormControl(''),
      employment_type: new FormControl(''),
      skills: new FormControl(''),
      phone : new FormControl(''),
      email_id : new FormControl(''),
      address: new FormControl(''),
      uid_type: new FormControl(''),
      uid_number:new FormControl(''),
      notice_period: new FormControl(''),
      certification: new FormControl(''),
      languages_known : new FormControl(''),
      applicant_status: new FormControl(''),
     

    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.applicantForm.controls[controlName].hasError(errorName);

  }
  Loadapplicant() {
    this.applicantService.GetAllApplicantprofile()
      .subscribe((data: Applicant[]) => {
        this.app = data;
        this.data_Source = new MatTableDataSource(this.app);
      });
  }
  
  m_applicantSearchQuery() {

    this.v_appSearchQuery = 'SELECT * FROM pact_rmg.view_getallapplicants';


    this.obj_app = Object.assign({}, this.applicantForm.value);

    console.log(this.v_appSearchQuery.length + ":length");
    console.log(this.obj_app);

    if (this.obj_app.applicant_code || this.obj_app.applicant_name ||
       this.obj_app.gender || this.obj_app.date_of_birth || this.obj_app.marital_status ||
      this.obj_app.educational_details || this.obj_app.experience || this.obj_app.previous_company || this.obj_app.employment_type ||
      this.obj_app.skills || this.obj_app.phone || this.obj_app.email_id || this.obj_app.address ||
      this.obj_app.uid_type || this.obj_app.uid_number || this.obj_app.notice_period || this.obj_app.certification ||
      this.obj_app.languages_known || this.obj_app.applicant_status) {
      this.v_appSearchQuery = this.v_appSearchQuery.concat(' where');
      console.log(this.v_appSearchQuery.length)
    }
    if (this.obj_app.applicant_code) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" applicant_code like '%" + this.obj_app.applicant_code + "%' ");
    }

    if (this.obj_app.applicant_name) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" applicant_name like '%" + this.obj_app.applicant_name + "%' ");
    }
  
    if (this.obj_app.gender) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" gender like '%" + this.obj_app.gender + "%' ");
    }
    if (this.obj_app.date_of_birth) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" date_of_birth like '%" + this.obj_app.date_of_birth + "%' ");
    }
    if (this.obj_app.marital_status) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" marital_status like '%" + this.obj_app.marital_status + "%' ");
    }
    if (this.obj_app.educational_details) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" educational_details like '%" + this.obj_app.educational_details + "%' ");
    }
    if (this.obj_app.experience) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" experience like '%" + this.obj_app.experience + "%' ");
    }
    if (this.obj_app.previous_company) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" previous_company like '%" + this.obj_app.previous_company + "%' ");
    }
    if (this.obj_app.employment_type) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" employment_type like '%" + this.obj_app.employment_type + "%' ");
    }
    if (this.obj_app.skills) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" skills like '%" + this.obj_app.skills + "%' ");
    }

    if (this.obj_app.phone) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" phone like '%" + this.obj_app.phone + "%' ");
    }
    if (this.obj_app.email_id) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" email_id like '%" + this.obj_app.email_id + "%' ");
    }
    if (this.obj_app.address) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" address like '%" + this.obj_app.address + "%' ");
    }
    if (this.obj_app.uid_number) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" uid_number like '%" + this.obj_app.uid_number + "%' ");
    }
    if (this.obj_app.uid_type) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" uid_type like '%" + this.obj_app.uid_type + "%' ");
    }
    if (this.obj_app.notice_period) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" notice_period like '%" + this.obj_app.notice_period + "%' ");
    }
    if (this.obj_app.certification) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" certification like '%" + this.obj_app.certification + "%' ");
    }
    if (this.obj_app.languages_known) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" languages_known like '%" + this.obj_app.languages_known + "%' ");
    }
    if (this.obj_app.applicant_status) {
      if (this.v_appSearchQuery.length > 44) {
        this.v_appSearchQuery = this.v_appSearchQuery.concat(" and ")
      }
      this.v_appSearchQuery = this.v_appSearchQuery.concat(" applicant_status like '%" + this.obj_app.applicant_status + "%' ");
    }

    console.log(this.v_appSearchQuery);

    return this.applicantService.ApplicantsearchQuery(this.v_appSearchQuery).subscribe((data: Applicant[]) => {
      this.list_applicants = data;
      this.data_Source = new MatTableDataSource(this.list_applicants);
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
    this.excelService.exportAsExcelFile(this.app, 'Applicants');
  }
  displayedColumns: string[] = ['edit', 'applicant_code', 'applicant_name', 'gender', 'date_of_birth', 'marital_status', 'educational_details', 'experience', 'previous_company', 'employment_type', 'skills', 'phone', 'email_id', 'address', 'uid_type', 'uid_number', 'notice_period', 'certification', 'languages_known','applicant_status'];

 

  OnResetSearch() {
    this.applicantForm.reset();
  }

}
