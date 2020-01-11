import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectAttribute } from '../../models/ProjectAttribute';
import { BaseLocation } from '../../models/BaseLocation';
import { CustomerDetailsAtrribute } from '../../models/CustomerDetails';
import { ProjectService } from '../../services/ProjectService';
import { NotificationService } from '../../services/NotificationService';
import { UserService } from '../../services/UserService';
import { DialogService } from '../../services/dialog.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MyDateAdapter } from '../../shared/myDateAdapter';
import { DatePipe } from '@angular/common';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-addprojectpopup',
  templateUrl: './addprojectpopup.component.html',
  styleUrls: ['./addprojectpopup.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddprojectpopupComponent implements OnInit {


  public projectForm: FormGroup;
  proj: ProjectAttribute[];
  projectlist: ProjectAttribute[];
  Location: BaseLocation[];
  Customer: CustomerDetailsAtrribute[];
  projectStatus = '';
  //projectBillable = 'Yes';
  Yes;
  projAdd : any;
  service: any;
  nrSelect = 'Yes';
  title = 'ADD PROJECT'
  data_Source : MatTableDataSource<ProjectAttribute>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<AddprojectpopupComponent>, private projectservice: ProjectService,
    private notificationservice: NotificationService, private userservice: UserService, private dialogService: DialogService, public datepipe: DatePipe) {
  }

  createdbyId = this.userservice.getLoginData(sessionStorage.getItem('empId'));

  ngOnInit() {
    
    this.dialogRef.updateSize('54%', '54%');
    this.LoadCity();
    this.LoadCustomerDetails();
    this.LoadProjectDetails();
    this.projectForm = new FormGroup({
      
      project_Name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z, ]+$')]),
      project_Code: new FormControl('', [Validators.required]),
      project_Description: new FormControl('', [Validators.maxLength(500)]),
      project_StartDate: new FormControl('',),
      project_EndDate: new FormControl('', ),
      //project_Status: new FormControl('', [Validators.required]),
      project_LocationId: new FormControl(''),
      project_Location: new FormControl(''),
      project_Billable: new FormControl('',),
      customer_Details: new FormControl('', [Validators.required] ),
      created_By: new FormControl(sessionStorage.getItem('empId'))
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.projectForm.controls[controlName].hasError(errorName);
  }
 
  onSubmit() {

    if (this.projectForm.valid) {
      this.proj = Object.assign({}, this.projectForm.value);
      console.log(this.proj);
      return this.projectservice.AddProjects(this.proj).subscribe(
        result => {
          this.projAdd = result;
          if (!this.projAdd.status) {
            this.dialogService.openAlertDialog('Something went wrong, please try again.');
          }
          console.log(result);
          this.dialogRef.close(this.projectForm.value);
          this.projectForm.reset();
          this.notificationservice.success(':: Submitted successfully');
          this.LoadProjectDetails();
          this.onClose();
          
        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      this.notificationservice.warn('Please enter the details');
    }
  }


  LoadProjectDetails() {
    this.projectservice.getProjects()
      .subscribe((data: ProjectAttribute[]) => {
        this.projectlist = data;
        this.data_Source = new MatTableDataSource<ProjectAttribute>(this.projectlist);
        this.data_Source.sort = this.sort;
        this.data_Source.paginator = this.paginator;
      });

  }
  searchbar = false;
  loaddata = false;
  OnLoadData() {
    this.loaddata = true;
    this.searchbar = true;
  }
  LoadCity() {
    this.projectservice.GetAllCity()
      .subscribe((data: BaseLocation[]) => {
        this.Location = data;
      });
  }
  LoadCustomerDetails() {
    this.projectservice.GetAllCustomerDetails()
      .subscribe((data: CustomerDetailsAtrribute[]) => {
        this.Customer = data;
      });
  }

  onClose() {
    this.dialogRef.close(false);
  }

  onClear() {
   
    if (this.projectForm.touched == true) {
      this.projectForm.reset();
      this.notificationservice.success('Cleared Succesfully');
    }
    else {
      this.notificationservice.warn('There is nothing to Clear');
    }
  }
}
