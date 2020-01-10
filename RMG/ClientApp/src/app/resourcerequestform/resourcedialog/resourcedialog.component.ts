import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectdropdownAttribute } from '../../models/ProjectdropdownAttribute';
import { CustomerdropdownAttribute } from '../../models/CustomerdropdownAttribute';
import { ResourceReqAttribute } from '../../Models/ResourceReqAttribute';
import { ResourceReqService } from '../../services/ResourceReqService';
import { NotificationService } from '../../services/NotificationService';
import { UserService } from '../../services/UserService';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MyDateAdapter } from '../../shared/myDateAdapter';
import { ReportService } from '../../services/reportservice';
import { RoleService } from '../../services/RoleService';
import { CoeDescription } from '../../models/CoeDescription';
import { EmployeeService } from '../../services/EmployeeService';
import { EdgePractice } from '../../models/EdgePractice';
import { CustomerDetailsAtrribute } from '../../models/CustomerDetails';
import { ProjectService } from '../../services/ProjectService';
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
  selector: 'app-resourcedialog',
  templateUrl: './resourcedialog.component.html',
  styleUrls: ['./resourcedialog.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ResourcedialogComponent implements OnInit {

  resourcerequest: ResourceReqAttribute[] = [];
  projectdropdownlist: ProjectdropdownAttribute[];
  projectlist: ProjectdropdownAttribute[];
  //customerdropdownlist: CustomerdropdownAttribute[];
  public ResourceReqAttributeList: ResourceReqAttribute[];
  resourcereqForm: FormGroup;
  title = 'Create Resource Request';
  resreqid: string;
  typBill: any;
  typeReq: any;
  loc: any;
  cat: any;
  result1: any;
  coe: CoeDescription[];
  edge: EdgePractice[];
  customers: CustomerDetailsAtrribute[];
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ResourcedialogComponent>,
    private roleservice: RoleService, private employeeService: EmployeeService, private projectservice: ProjectService,
    private resourcereqservice: ResourceReqService, private notificationservice: NotificationService, private userservice: UserService) { }


  

  ngOnInit() {
    this.dialogRef.updateSize('65%', '60%');
    this.LoadProjectDropdown();
    this.LoadGetAllCoeDescription();
    this.LoadEdgePracticeDescription();
    this.LoadCustomerDetails();
    
  //  this.projectlist = [];
   // this.LoadCustomerDropdown();
    //console.log(this.ResReqTicket());
    this.resourcereqForm = new FormGroup({
      res_req_num_res: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      res_req_request_for: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      res_req_project_name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      res_req_customer_name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      res_req_ccc: new FormControl('', [ Validators.maxLength(15)]),
      res_req_COE: new FormControl('', [Validators.required]),
      res_req_skillset: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      res_req_type_of_billing: new FormControl('', [Validators.required]),
      res_req_location: new FormControl('', [Validators.required]),
      res_req_category: new FormControl('', [Validators.required]),
      res_req_practice_name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      res_req_textarea: new FormControl('', [Validators.maxLength(500)]),
      res_req_start_date: new FormControl('', [Validators.required]),
      res_req_end_date: new FormControl('', [Validators.required]),
      res_req_created_by: new FormControl(sessionStorage.getItem("empId"))
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resourcereqForm.controls[controlName].hasError(errorName);
  }

  LoadProjectDropdown() {
    this.roleservice.getprjdrop().subscribe((data: ProjectdropdownAttribute[]) => {
      this.projectlist = data;
    });
  }

  //LoadCustomerDropdown() {
  //  this.resourcereqservice.GetCustomerDropdown().subscribe((data: CustomerdropdownAttribute[]) => { this.customerdropdownlist = data; });
  //}

  //To get the dropdown for COE
  LoadGetAllCoeDescription() {
    this.employeeService.GetAllCoeDescription()
      .subscribe((data: CoeDescription[]) => {
        console.log(data);
        this.coe = data;
      })
  }


  LoadEdgePracticeDescription() {
    this.employeeService.GetAllEdgePractice()
      .subscribe((data: EdgePractice[]) => {
        this.edge = data;
      })
  }

  LoadCustomerDetails() {
    this.projectservice.GetAllCustomerDetails()
      .subscribe((data: CustomerDetailsAtrribute[]) => {
        this.customers = data;
      });
  }



  onSubmit() {
    
    if (this.resourcereqForm.valid) {
      this.resourcerequest = Object.assign({}, this.resourcereqForm.value);
      console.log(this.resourcerequest);
      return this.resourcereqservice.saveResreq(this.resourcerequest).subscribe(
        result => {
          this.result1 = result;
          //console.log(result);
          if (!this.result1.status) {

          } else {
            //this.dialogRef.close(this.resourcereqForm.value);
            //this.resourcereqForm.reset();
            //this.ResReqTicket();
            this.close();
            this.notificationservice.success('Submitted Succesfully');
            
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  //ResReqTicket() {
  //  this.resourcereqservice.ResReqid().subscribe((data: string) => {
  //    this.resreqid = data;
  //  });
  //}
  close() {
    this.resourcereqForm.reset();
    this.dialogRef.close();
  }
  onClear() {
    this.resourcereqForm.reset();
    this.notificationservice.success('Cleared Succesfully');
  }

  getProjectName(event: any) {
    const ProjectNameList = this.projectdropdownlist.filter(data => data.cust_Name === event.option.value);
    this.resourcereqForm.get('res_req_project_name').reset();
    this.projectlist = ProjectNameList;
    //const ProjectName = ProjectNameList[0].project_Name;
    //this.resourcereqForm.get('project_Name').setValue(ProjectName);
  }

  //getCustomerName(event: any) {
  //  const CustomerNameList = this.projectdropdownlist.filter(data => data.project_Name === event.option.value);
  //  const CustomerName = CustomerNameList[0].cust_Name;
  //  this.resourcereqForm.get('customer_Name').setValue(CustomerName);
  //}

}
