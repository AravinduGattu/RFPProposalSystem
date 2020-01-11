import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { EmployeeService } from '../services/EmployeeService';
import { VendorService } from '../services/VendorService';
import { ProjectService } from '../services/ProjectService';
import { RoleService } from '../services/RoleService';
import { CustomerService } from '../services/CustomerService';
import { AdminService } from '../services/AdminConfigService';
import { JobDescriptionService } from '../services/JobDescriptionService';
import { PanelService } from '../services/PanelService';
import { AssignPanelService } from '../services/AssignPanelService';
import { ApplicantProfileReviewService } from '../services/ApplicantProfileReviewService';
import { ReportService } from '../services/reportservice';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  file: File;
  fileToUpload: File = null;
  fileurl: any;
  jsonData: any;
  serviceEndpoint: string;
  constructor(
    private _employeeService: EmployeeService,
    private reportservice: ReportService,
    private _projectService: ProjectService,
    private _roles: RoleService,
    private _customers: CustomerService,
    private _admin: AdminService,
    private _jd: JobDescriptionService,
    private _panel: PanelService,
    private _vendor: VendorService,
    private _assignPanel: AssignPanelService,
    private _aps: ApplicantProfileReviewService,
    private _vendorService: VendorService,
    public dialogRef: MatDialogRef<UploadComponent>,
    private router: Router) { }

  ngOnInit() {
    this.dialogRef.updateSize('50 %',' 50 %');
  }

  handleFileInput(files:any) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary',cellDates: true });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet, { dateNF: "dd-mm-yyyy" });
        return initial;
      }, {});
      this.jsonData = jsonData.Sheet1.map((cur) => {
        return this.serviceConvert(cur);
      })
      
    }
    reader.readAsBinaryString(file);
  }
  serviceConvert(item: Object = {}) {
    if (this.router.url === '/employee') {
      return {
        bg_id: item['Bussiness Group'] || '',
        emp_Id: item['Employee Id'] || '',
        emp_Name: item['Employee Name'] || '',
        designation_Id: item['Designation'] || '',
        edge_Practice_Id: item['EDGE Practice'] || '',
        coe_Id: item['COE'] || '',
        location_Id: item['Location'] || '',
        joining_Date: item['Joining Date'] || '',
        contact_Number: item['Contact Number'] || '',
        address: item['Address'] || '',
        email_Id: item['Email ID'] || '',
        reporting_To: item['Reporting Manager'] || '',
        reporting_To_Email: item['Reporting Manager Email Id'] || '',
        flag_Status: 1,
      }
    }
    else if (this.router.url === '/projects') {
      return {
        project_Name: item['Project Name'] || '',
        project_Description: item['Project Description'] || '',
        project_StartDate: item['Start Date'] || '',
        project_EndDate: item['End Date'] || '',
        project_LocationId: item['Project Location'] || '',
        project_Billable: item['Billable'] || '',
        customer_Details: item['Customer'] || '',
      }
    }
    else if (this.router.url === '/roles') {
      return {
        employee_Id: item['Employee Id'] || '',
        role_Designation: item['Designation'] || '',
        project_Name: item['Project Name'] || '',
        role_Projects: item['Role in Project'] || '',
        role_Description: item['Role Description'] || '',
        role_StartDate: item['Start Date'] || '',
        role_EndDate: item['End Date'] || '',
      }
    }
    else if (this.router.url === '/customers') {
      return {
        business_group: item['Business Group'] || '',
        cust_id: item['Customer Code'] || '',
        cust_code: item['Customer Code'] || '',
        cust_name: item['Customer Name'] || '',
        country: item['Country'] || '',
        location_id: item['Location'] || '',
      }
    }
    else if (this.router.url === '/centerofexcellence') {
      return {
        coe: item['Center Of Excellence'] || '',
        coeStartDate: item['Start Date'] || '',
        coeEndDate: item[' End Date'] || '',
      }
    }
    else if (this.router.url === '/edgepractice') {
      return {
        edgePractice: item['Edge Practice Description'] || '',
        epStartDate: item['Start Date'] || '',
        epEndDate: item['End Date'] || '',
      }
    }
    else if (this.router.url === '/department') {
      return {
        department: item['Department'] || '',
        depStartDate: item['Start Date'] || '',
        depEndDate: item['End Date'] || '',
      }
    }
    else if (this.router.url === '/designation') {
      return {
        designation: item['Designation'] || '',
        designStartDate: item['Start Date'] || '',
        designEndDate: item['End Date'] || '',
      }
    }
    else if (this.router.url === '/bussinessgroup') {
      return {
        bg_description: item['Bussiness Group'] || '',
        bg_startdate: item['Start Date'] || '',
        bg_enddate: item['End Date'] || '',
      }
    }
    else if (this.router.url === '/jobdescription') {
      return {
        job_Posting_code: item['Job code'] || '',
        job_title: item['Job title'] || '',
        experience: item['Experience'] || '',
        worklocation: item['Work Location'] || '',
        salary: item['Salary'] || '',
        job_type: ['Job Type'] || '',
        skills: ['Skills'] || '',
        job_description: ['Job description'] || '',
      }
    }
    else if (this.router.url === '/panel') {
      return {
        panel_name: item['Panel Name'] || '',
        panel_role: item['Panel Role'] || '',
        email_id: item['Email'] || '',
        phone: item['Contact'] || '',
        panel_startdate: item['Panel Start Date'] || '',
        panel_enddate: item['Panel End Date'] || '',
      }
    }
    else if (this.router.url === '/vendor') {
      return {
        vendor_name: item['Vendor Name'] || '',
        email: item['Email'] || '',
        telephone: item['Telephone'] || '',
        mobile: item['Mobile'] || '',
        vendor_startdate: ['Vendor Start  Date'] || '',
        vendor_enddate: ['Vendor End  Date'] || '',
        vendor_site: item['Vendor Site'] || '',
      }
    }
    else if (this.router.url === '/assign-panel') {
      return {
        assign_panel_name: item['Panel Name'] || '',
        applicant_name: item['Applicant Name'] || '',
        time_slot: item['Time Slot'] || '',
        type_of_assessment: item['Type of Assessment'] || '',
        assignpanel_start_date: item['Assign Panel Start Date'] || '',
        assignpanel_end_date: item['Assign Panel End  Date'] || '',
      }
    }
    else if (this.router.url === '/applicant-profile-shortlist') {
      return {
        panel_name: item['Panel Name'] || '',
        applicant_name: item['Applicant Name'] || '',
        applicant_profile_status: item['Applicant Profile Status'] || '',
        panel_profile_review: item['Profile Review'] || '',
      }
    }
    else if (this.router.url === '/timesheetstemplate') {
      return {
        employee_No: item['Employee No'] || '',
        resource: item['Resource'] || '',
        project_pactera_legal_entity: item['Project: Pactera Legal Entity'] || '',
        timecard_id: item['Timecard: Timecard Id'] || '',
        project_id: item['Project: PID'] || '',
        approver: item['Approver'] || '',
        project_name: item['Project: Project Name'] || '',
        project_department: item['Project: Department'] || '',
        status: item['Status'] || '',
        start_Date: new Date(item['Start Date'] )|| '',
        end_Date: new Date(item['End Date']) || '',
        sunday_hours: item['Sunday Hours'] || 0,
        monday_hours: item['Monday Hours'] || 0,
        tuesday_hours: item['Tuesday Hours'] || 0,
        wednesday_hours: item['Wednesday Hours'] || 0,
        thursday_hours: item['Thursday Hours'] || 0,
        friday_hours: item['Friday Hours'] || 0,
        saturday_hours: item['Saturday Hours'] || 0,
        total_hours: item['Total Hours'] || 0,
      }
    }
  }
  onClose() { this.dialogRef.close(); }
  onSubmit() {
    if (this.jsonData.length) {
      if (this.router.url === '/employee') {
        this._employeeService.ImportEmployee(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
      else if (this.router.url === '/projects') {
        this._projectService.ImportProjects(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
      else if (this.router.url === '/roles') {
        this._roles.ImportRole(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
      else if (this.router.url === '/customers') {
        this._customers.ImportCustomer(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
      else if (this.router.url === '/centerofexcellence') {
        this._admin.ImportCoe(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
      else if (this.router.url === '/edgepractice') {
        this._admin.ImportEdgePractice(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
      else if (this.router.url === '/department') {
        this._admin.ImportDepartment(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
      else if (this.router.url === '/designation') {
        this._admin.ImportDesignation(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
      else if (this.router.url === '/bussinessgroup') {
        this._admin.ImportBusinessGroup(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
      else if (this.router.url === '/jobdescription') {
        this._jd.ImportJobDescription(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
      else if (this.router.url === '/panel') {
        this._panel.ImportPanel(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
      else if (this.router.url === '/vendor') {
        this._vendor.ImportVendor(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
      else if (this.router.url === '/assign-panel') {
        this._assignPanel.ImportAssignPanel(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
      else if (this.router.url === '/applicant-profile-shortlist') {
        this._aps.ImportApplicantProfileReview(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
      else if (this.router.url === '/timesheetstemplate') {
        this.reportservice.ImportTimesheets(this.jsonData).subscribe(() => {
          this.onClose();
        })
      }
    }
      else {
        alert('No Data found in the file');
      }
  }
  OnDownload() {
    if (this.router.url === '/employee')
    {
      FileSaver.saveAs('../../assets/templates/Employee Template.xlsx','Employee Template.xlsx');
    }
    else if (this.router.url === '/projects')
    {
      FileSaver.saveAs('../../assets/templates/Projects Template.xlsx', 'Projects Template.xlsx');
    }
    else if (this.router.url === '/roles')
    {
      FileSaver.saveAs('../../assets/templates/Assign Roles Template.xlsx', 'Assign Roles Template.xlsx');
    }
    else if (this.router.url === '/customers')
    {
      FileSaver.saveAs('../../assets/templates/Customers Template.xlsx', 'Customers Template.xlsx');
    }
    else if (this.router.url === '/centerofexcellence')
    {
      FileSaver.saveAs('../../assets/templates/COE Template.xlsx', 'COE Template.xlsx');
    }
    else if (this.router.url === '/edgepractice')
    {
      FileSaver.saveAs('../../assets/templates/Edge Practice Template.xlsx', 'Edge Practice Template.xlsx');
    }
    else if (this.router.url === '/department')
    {
      FileSaver.saveAs('../../assets/templates/Department Template.xlsx', 'Department Template.xlsx');
    }
    else if (this.router.url === '/designation')
    {
      FileSaver.saveAs('../../assets/templates/Designation Template.xlsx', 'Designation Template.xlsx');
    }
    else if (this.router.url === '/bussinessgroup')
    {
      FileSaver.saveAs('../../assets/templates/Bussiness Group Template.xlsx', 'Bussiness Group Template.xlsx');
    }
    else if (this.router.url === '/jobdescription')
    {
      FileSaver.saveAs('../../assets/templates/Job Description Template.xlsx', 'Job Description Template.xlsx');
    }
    else if (this.router.url === '/panel')
    {
      FileSaver.saveAs('../../assets/templates/Panel Template.xlsx', 'Panel Template.xlsx');
    }
    else if (this.router.url === '/vendor')
    {
      FileSaver.saveAs('../../assets/templates/Vendor Template.xlsx', 'Vendor Template.xlsx');
    }
    else if (this.router.url === '/assign-panel')
    {
      FileSaver.saveAs('../../assets/templates/Assign Panel Template.xlsx', 'Assign Panel Template.xlsx');
    }
    else if (this.router.url === '/applicant-profile-shortlist')
    {
      FileSaver.saveAs('../../assets/templates/Application Profile Review Template.xlsx', 'Application Profile Review Template.xlsx');
    }
  }
}
