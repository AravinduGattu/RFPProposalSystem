import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopComponent } from './top/top.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { EmployeeAddPopupComponent } from './employee/employee-add-popup/employee-add-popup.component';
import { EmployeeEditPopupComponent } from './employee/employee-edit-popup/employee-edit-popup.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectsComponent } from './projects/projects.component';
import { RolesComponent } from './roles/roles.component';
import { LoginlayoutComponent } from './layout/loginlayout/loginlayout.component';
import { ApplayoutComponent } from './layout/applayout/applayout.component';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './customers/customers.component';
import { AlertDialogComponent } from './dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { ResourcerequestformComponent } from './resourcerequestform/resourcerequestform.component';
import { ResourcedialogComponent } from './resourcerequestform/resourcedialog/resourcedialog.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { RoledialogComponent } from './roles/roledialog/roledialog.component';
import { AssessmentAddPopupComponent } from './assessment/assessment-add-popup/assessment-add-popup.component';
import { AssessmentEditPopupComponent } from './assessment/assessment-edit-popup/assessment-edit-popup.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { RRFChildDialogComponent } from './resourcerequestform/rrfchild-dialog/rrfchild-dialog.component';
import { AddprojectpopupComponent } from './projects/addprojectpopup/addprojectpopup.component';
import { EditProjectpopupComponent } from './projects/edit-projectpopup/edit-projectpopup.component';
import { CustomerPopupInsertComponent } from './customers/customer-popup-insert/customer-popup-insert.component';
import { CustomerPopupEditComponent } from './customers/customer-popup-edit/customer-popup-edit.component';
import { EditRoleComponent } from './roles/edit-role/edit-role.component';
import { AssignProjDialogComponent } from './resourcerequestform/assign-proj-dialog/assign-proj-dialog.component';
import { EmpProjManagementComponent } from './emp-proj-management/emp-proj-management.component';
import { UploadComponent } from './upload/upload.component';
import { NewjobrequirementComponent } from './resourcerequestform/newjobrequirement/newjobrequirement.component';
import { PanelComponent } from './panel/panel.component';
import { PanelInsertPopupComponent } from './panel/panel-insert-popup/panel-insert-popup.component';
import { PanelEditPopupComponent } from './panel/panel-edit-popup/panel-edit-popup.component';
import { ApplicantProfileShortlistComponent } from './applicant-profile-shortlist/applicant-profile-shortlist.component';
import { ApplicantprofilereviewInsertpopupComponent } from './applicant-profile-shortlist/applicantprofilereview-insertpopup/applicantprofilereview-insertpopup.component';
import { ApplicantprofilereviewEditpopupComponent } from './applicant-profile-shortlist/applicantprofilereview-editpopup/applicantprofilereview-editpopup.component';
import { VendorComponent } from './vendor/vendor.component';
import { VendorInsertPopUpComponent } from './vendor/vendor-insert-pop-up/vendor-insert-pop-up.component';
import { VendorEditPopUpComponent } from './vendor/vendor-edit-pop-up/vendor-edit-pop-up.component';
import { AssignPanelComponent } from './assign-panel/assign-panel.component';
import { AssignPanelInsertPopupComponent } from './assign-panel/assign-panel-insert-popup/assign-panel-insert-popup.component';
import { AssignPanelEditPopupComponent } from './assign-panel/assign-panel-edit-popup/assign-panel-edit-popup.component';
import { JobdescriptionComponent } from './jobdescription/jobdescription.component';
import { JobdescriptionEditPopupComponent } from './jobdescription/jobdescription-edit-popup/jobdescription-edit-popup.component';
import { JobdescriptionInsertPopupComponent } from './jobdescription/jobdescription-insert-popup/jobdescription-insert-popup.component';
import { EdgepracticeComponent } from './edgepractice/edgepractice.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { CenterofexcellenceComponent } from './centerofexcellence/centerofexcellence.component';
import { BussinessgroupComponent } from './bussinessgroup/bussinessgroup.component';
import { CoeAddPopupComponent } from './centerofexcellence/coe-add-popup/coe-add-popup.component';
import { CoeEditPopupComponent } from './centerofexcellence/coe-edit-popup/coe-edit-popup.component';
import { AddpopupdepartmentComponent } from './department/addpopupdepartment/addpopupdepartment.component';
import { AddpopupedgepracticeComponent } from './edgepractice/addpopupedgepractice/addpopupedgepractice.component';
import { AddpopupdesignationComponent } from './designation/addpopupdesignation/addpopupdesignation.component';
import { EditedgepopupComponent } from './edgepractice/editedgepopup/editedgepopup.component';
import { EditdepartmentpopupComponent } from './department/editdepartmentpopup/editdepartmentpopup.component';
import { EditdesignationpopupComponent } from './designation/editdesignationpopup/editdesignationpopup.component';
import { EditbussinesspopupComponent } from './bussinessgroup/editbussinesspopup/editbussinesspopup.component';
import { AddbusinessgrouppopupComponent } from './bussinessgroup/addbusinessgrouppopup/addbusinessgrouppopup.component';
import { MaterialModule } from './shared/MaterialModule';
import { ChartsModule } from 'ng2-charts';
import { LoginGuard } from './services/LoginGuard';
import { AuthGuard } from './services/AuthGuard';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { EmployeeService } from './services/EmployeeService';
import { ProjectService } from './services/ProjectService';
import { RoleService } from './services/RoleService';
import { UserService } from './services/UserService';
import { CustomerService } from './services/CustomerService';
import { AssignProjectService } from './Services/AssignProjectService';
import { AssesmentService } from './services/AssesmentService';
import { ExcelService } from './services/ExcelExport';
import { HomeService } from './services/HomeService';
import { DialogService } from './services/dialog.service';
import { DatePipe } from '@angular/common';
import { ReportService } from './services/reportservice';
import { ResourceReqService } from './services/ResourceReqService';
import { NotificationService } from './services/NotificationService';
import { LoaderService } from './services/loader.service';
import { NewjobrequirementService } from './services/NewjobrequirementService';
import { PanelService } from './services/PanelService';
import { VendorService } from './services/VendorService';
import { ApplicantProfileReviewService } from './services/ApplicantProfileReviewService';
import { AssignPanelService } from './services/AssignPanelService';
import { JobDescriptionService } from './services/JobDescriptionService';
import { LoaderInterceptor } from './shared/loader/loader.interceptor';
import { AdminService } from './services/AdminConfigService';
import { RoleGuardAdmin } from './services/RoleGuardAdmin';
import { RoleGuardRRF } from './services/RoleGuardRRF';
import { RoleGuardEmp } from './services/RoleGuardEmp';
import { RoleGuardTA } from './services/RoleGuardTA';
import { RoleGuardProj } from './services/RoleGuardProj';
import { RoleGuardCust } from './services/RoleGuardCust';
import { RoleGuardReports } from './services/RoleGuardReports';
import { ApplicantComponent } from './applicant/applicant.component';
import { ApplicantService } from './services/ApplicantServicets';
import { DeliverableComponent } from './deliverable/deliverable.component';
import { AssignprojacceptformComponent } from './resourcerequestform/assignprojacceptform/assignprojacceptform.component';
import { TimesheetstemplateComponent } from './timesheetstemplate/timesheetstemplate.component';
import { EmpProjMngtEditPopupComponent } from './emp-proj-management/emp-proj-mngt-edit-popup/emp-proj-mngt-edit-popup.component';
import { EmpProjMngtInfoComponent } from './emp-proj-management/emp-proj-mngt-info/emp-proj-mngt-info.component';
import { ReportsSkillsetComponent } from './reports/reports-skillset/reports-skillset.component';
import { EmployeeCategoriesComponent } from './reports/employee-categories/employee-categories.component';
import { PowerBiDashboardComponent } from './reports/power-bi-dashboard/power-bi-dashboard.component';

 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopComponent,
    DropdownDirective,
    EmployeeAddPopupComponent,
    EmployeeEditPopupComponent,
    EmployeeComponent,
    ProjectsComponent,
    RolesComponent,
    LoginlayoutComponent,
    ApplayoutComponent,
    LoginComponent,
    CustomersComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    ResourcerequestformComponent,
    ResourcedialogComponent,
    LoaderComponent,
    RoledialogComponent,
    AssessmentAddPopupComponent,
    AssessmentEditPopupComponent,
    AssessmentComponent,
    RRFChildDialogComponent,
    AddprojectpopupComponent,
    EditProjectpopupComponent,
    CustomerPopupInsertComponent,
    CustomerPopupEditComponent,
    EditRoleComponent,
    AssignProjDialogComponent,
    EmpProjManagementComponent,
    UploadComponent,
    NewjobrequirementComponent,
    PanelComponent,
    PanelInsertPopupComponent,
    PanelEditPopupComponent,
    ApplicantProfileShortlistComponent,
    ApplicantprofilereviewInsertpopupComponent,
    ApplicantprofilereviewEditpopupComponent,
    VendorComponent,
    VendorInsertPopUpComponent,
    VendorEditPopUpComponent,
    AssignPanelComponent,
    AssignPanelInsertPopupComponent,
    AssignPanelEditPopupComponent, 
    JobdescriptionComponent,
    JobdescriptionEditPopupComponent, 
    JobdescriptionInsertPopupComponent, 
    EdgepracticeComponent,
    DepartmentComponent,
    DesignationComponent,
    CenterofexcellenceComponent,
    BussinessgroupComponent,
    CoeAddPopupComponent,
    CoeEditPopupComponent,
    AddpopupdepartmentComponent,
    AddpopupedgepracticeComponent,
    AddpopupdesignationComponent,
    EditedgepopupComponent,
    EditdepartmentpopupComponent,
    EditdesignationpopupComponent,
    EditbussinesspopupComponent,
    AddbusinessgrouppopupComponent,
    ApplicantComponent,
    DeliverableComponent,
    AssignprojacceptformComponent,
    TimesheetstemplateComponent,
    EmpProjMngtEditPopupComponent,
    EmpProjMngtInfoComponent,
    ReportsSkillsetComponent,
    EmployeeCategoriesComponent,
    PowerBiDashboardComponent,
    ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ChartsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginlayoutComponent,
        children: [
          { path: '', canActivate: [LoginGuard],component: LoginComponent, pathMatch: 'full' },
        ]
      },
   // App routes goes here
            {
        path: '',
        component: ApplayoutComponent,
        children: [
          { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
          { path: 'employee', canActivate: [RoleGuardEmp], component: EmployeeComponent },
          { path: 'projects', canActivate: [RoleGuardProj], component: ProjectsComponent },
          { path: 'roles', canActivate: [RoleGuardRRF], component: RolesComponent },
          { path: 'customers', canActivate: [RoleGuardCust], component: CustomersComponent },
          { path: 'centerofexcellence', canActivate: [RoleGuardAdmin], component: CenterofexcellenceComponent },
          { path: 'edgepractice', canActivate: [RoleGuardAdmin], component: EdgepracticeComponent },
          { path: 'department', canActivate: [RoleGuardAdmin], component: DepartmentComponent },
          { path: 'designation', canActivate: [RoleGuardAdmin], component: DesignationComponent },
          { path: 'bussinessgroup', canActivate: [RoleGuardAdmin], component: BussinessgroupComponent },
          { path: 'resourcereq', canActivate: [RoleGuardRRF], component: ResourcerequestformComponent },
          { path: 'EmpProjInfo', canActivate: [RoleGuardReports], component: EmpProjManagementComponent },
          { path: 'EmpProjectInfo', canActivate: [RoleGuardReports], component: EmpProjMngtInfoComponent },
          { path: 'panel', canActivate: [RoleGuardTA], component: PanelComponent },
          { path: 'vendor', canActivate: [RoleGuardTA], component: VendorComponent },
          { path: 'assign-panel', canActivate: [RoleGuardTA], component: AssignPanelComponent },
          { path: 'applicant-profile-shortlist', canActivate: [RoleGuardTA], component: ApplicantProfileShortlistComponent },
          { path: 'assessment', canActivate: [RoleGuardTA], component: AssessmentComponent },
          { path: 'jobdescription', canActivate: [RoleGuardTA], component: JobdescriptionComponent },
          { path: 'applicant', canActivate: [RoleGuardTA], component: ApplicantComponent },
          { path: 'assessment/assesedit', canActivate: [RoleGuardTA], component: AssessmentEditPopupComponent },
          { path: 'skills', canActivate: [RoleGuardRRF], component: ReportsSkillsetComponent },
          { path: 'EmpCat', canActivate: [RoleGuardRRF], component: EmployeeCategoriesComponent },
          { path: 'deliverable', canActivate: [AuthGuard], component: DeliverableComponent },
          { path: 'powerBI-dashboard', component: PowerBiDashboardComponent },
           { path: 'timesheetstemplate', canActivate: [AuthGuard], component: TimesheetstemplateComponent }
                ]
        },

    ]),
    MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule,
    ],
    providers: [
      EmployeeService,
      ProjectService,
      RoleService,
      UserService,
      AuthGuard,
      RoleGuardAdmin,
      RoleGuardRRF,
      RoleGuardEmp,
      RoleGuardTA,
      RoleGuardProj,
      RoleGuardCust,
      RoleGuardReports,
      CustomerService,
      LoginGuard,
      AssignProjectService,
      AssesmentService,
      ExcelService,
      HomeService,
      DialogService,
      DatePipe,
      ReportService,
      ResourceReqService,
      NotificationService,
      LoaderService,
      NewjobrequirementService,
      PanelService,
      VendorService,
      ApplicantProfileReviewService,
      AssignPanelService, 
      JobDescriptionService,
      ApplicantService,

      { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
      AdminService,
      ReportService],
    
      bootstrap: [AppComponent],
    
    entryComponents: [
      LoginComponent,
      AlertDialogComponent,
      ConfirmDialogComponent,
      ResourcedialogComponent,
      RoledialogComponent,
      AddprojectpopupComponent,
      EmployeeAddPopupComponent,
      EmployeeEditPopupComponent,
      EditProjectpopupComponent,
      CustomerPopupInsertComponent,
      AssessmentAddPopupComponent,
      AssessmentEditPopupComponent,
      CustomerPopupEditComponent,
      RRFChildDialogComponent,
      EditRoleComponent,
      AssignProjDialogComponent,
      CoeAddPopupComponent,
      CoeEditPopupComponent,
      AddpopupedgepracticeComponent,
      AddpopupdepartmentComponent,
      AddpopupdesignationComponent,
      AddbusinessgrouppopupComponent,
      EditedgepopupComponent,
      EditdepartmentpopupComponent,
      EditdesignationpopupComponent,
      EditbussinesspopupComponent,
      UploadComponent,
      PanelInsertPopupComponent,
      PanelEditPopupComponent,
      AssignPanelInsertPopupComponent,
      AssignPanelEditPopupComponent,
      ApplicantprofilereviewEditpopupComponent,
      ApplicantprofilereviewInsertpopupComponent,
      VendorInsertPopUpComponent,
      JobdescriptionEditPopupComponent,
      JobdescriptionInsertPopupComponent,
      VendorEditPopUpComponent, 
      NewjobrequirementComponent,
      AssignprojacceptformComponent,
      EmpProjMngtEditPopupComponent]
})
export class AppModule { }
