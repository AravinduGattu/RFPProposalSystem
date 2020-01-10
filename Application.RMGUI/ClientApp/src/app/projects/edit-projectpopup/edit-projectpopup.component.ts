import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectAttribute } from '../../models/ProjectAttribute';
import { BaseLocation } from '../../models/BaseLocation';
import { ProjectService } from '../../services/ProjectService';
import { NotificationService } from '../../services/NotificationService';
import { CustomerDetailsAtrribute } from '../../models/CustomerDetails';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../services/dialog.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MyDateAdapter } from '../../shared/myDateAdapter';
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
  selector: 'app-edit-projectpopup',
  templateUrl: './edit-projectpopup.component.html',
  styleUrls: ['./edit-projectpopup.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditProjectpopupComponent implements OnInit {

  public projectForm: FormGroup;
  proj: ProjectAttribute[];
  projectlist: ProjectAttribute[];
  Location: BaseLocation[];
  Customer: CustomerDetailsAtrribute[];
  projectStatus = '';
  projectBillable = '';
  service: any;
  projAdd: any;
  editable;
  selectedoption: any;
  selected: any;
  title= 'EDIT PROJECT'
  data_Source: MatTableDataSource<ProjectAttribute>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<EditProjectpopupComponent>, public projectservice: ProjectService, private notificationservice: NotificationService, private dialogService: DialogService) {
  }
  ngOnInit() {
    //this.dialogRef.updateSize('54%', '50%');
    this.LoadCity();
    this.LoadCustomerDetails();
    this.LoadProjectDetails();
    this.projectForm = new FormGroup({
      project_Name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      project_Code: new FormControl('', [Validators.required]),
      project_Description: new FormControl('', [Validators.maxLength(500)]),
      project_StartDate: new FormControl('', ),
      project_EndDate: new FormControl('', ),
      project_Status: new FormControl('0', ),
      project_LocationId: new FormControl(''),
      project_Location: new FormControl(''),
      project_Billable: new FormControl('0',),
      customer_Details: new FormControl('', [Validators.required] )
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.projectForm.controls[controlName].hasError(errorName);
  }
  onUpdate() {

    if (this.projectservice.projectForm.dirty === true) {
      if (this.projectservice.projectForm.valid) {
        this.proj = Object.assign({}, this.projectservice.projectForm.value);
        console.log(this.proj);
        return this.projectservice.UpdateProject(this.proj).subscribe(
          result => {
            this.projAdd = result;
            if (!this.projAdd.status) {
              this.dialogService.openAlertDialog('Something went wrong, please try again.');
            }
            console.log(result);
            this.dialogRef.close(this.projectForm.value);
            this.projectForm.reset();
            this.notificationservice.success(' Submitted successfully');
            this.LoadProjectDetails();
            this.onClose();
          },
          err => {
            console.log(err);
          }
        );
      }
    }
    else {
      this.notificationservice.success('No Changes To Save');
    }

  }

  LoadProjectDetails() {
    this.projectservice.getProjects()
      .subscribe((data: ProjectAttribute[]) => {
        this.projectlist = data;
        this.data_Source = new MatTableDataSource(this.projectlist);
        this.data_Source.sort = this.sort;
        this.data_Source.paginator = this.paginator;
      });

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
    this.projectForm.reset();
   // this.projectservice.intiliazeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.projectForm.reset();
   // this.projectservice.intiliazeFormGroup();
    this.notificationservice.success(':: Cleared successfully');
  }
}
