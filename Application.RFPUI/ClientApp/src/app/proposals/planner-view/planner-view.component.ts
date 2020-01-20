import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ProposalService } from '../proposal.service';
import { stepsForDL, stepsForPRL, stepsForPUL, stepsForSL, scheduleDetails, stepsForDLComplete } from '../../global/MockupConstants';
import { SessionService } from '../../global/session.service';
import { CommonService } from '../../services/common.service';
import { RequestTypes, Streams, MileStones, TaskStatus, appConstants } from '../../global/constants';
import { ProposalUsers, Session } from '../../global/enum';
import { NotificationService } from '../../services/notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-planner-view',
  templateUrl: './planner-view.component.html',
  styleUrls: ['./planner-view.component.css']
})
export class PlannerViewComponent implements OnInit {

  role: any;
  roles: any;

  sections: any;
  docSections: any;
  mileStones: any;
  requestTypes: any;
  practiceTypes: any;
  practiceLeads: any;
  taskStatus: any;
  locations: any;
  Leads: any;
  constants: any;
  
  proposaldata: any;
  scheduleData: any;
  steps: any[];
  proposalTitle: string;
  porposalStatus: string;
  proposalBy: string;

  formBasicProposal: FormGroup;
  formSchedule: FormGroup;
  formDocuments: FormGroup;
  formQuestionnaire: FormGroup;
  formAssignment: FormGroup;
  formPricing: FormGroup;

  documentsForm: FormArray;
  scheduleForm: FormArray;
  pricingForm: FormArray;
  assignmentForm: FormArray;
  questionnaireForm: FormArray;
  questionForm: FormArray;

  selectedTab: any;
  ageing: number;

  constructor(private proposalService: ProposalService,
    private sessionService: SessionService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService) {

    this.docSections = [
      {
        docSectionId: 'initialDocs',
        docSectionName: 'Received Documents',
        docForm: 'documents1'
      },
      {
        docSectionId: 'preparedDocs',
        docSectionName: 'Response Documents',
        docForm: 'documents2'
      },
      {
        docSectionId: 'glosssary',
        docSectionName: 'Final Documents',
        docForm: 'documents3'
      }
    ]
    
  }

  ngOnInit() {
    this.constants = appConstants;
    this.roles = ProposalUsers;
    this.role = +this.sessionService.getSession(Session.userRole);

    this.selectedTab = 1;
    var rfpID = this.activatedRoute.snapshot.params.Id;
    //this.proposaldata = RFPMockupData.filter(data => data.id === +rfpID)[0];
    this.getProposaldata(+rfpID);
    this.scheduleData = scheduleDetails;

    this.requestTypes = RequestTypes;
    this.practiceTypes = Streams;
    this.mileStones = MileStones;
    this.taskStatus = TaskStatus;
    this.getProposalTracking();
    this.createForms();
    this.getLocations();
    //this.formBasicProposal.get('practiceType').setValue(2);

    this.getPracticeLeads();

  }

  getLocations() {
    this.commonService.getLocationList().subscribe((response: any) => {
      this.locations = response;
    }, (error) => {

    })
  }

  //stream value from dummy proposal data
  getPracticeLeads() {
    this.commonService.getPracticeLeadsList().subscribe((response: any) => {
      this.Leads = response;
    this.dataLoad(); //data load for all forms


    }, (error) => {

    })
  }

  streamChange(stream: any) {
    this.formBasicProposal.get('practiceLead').setValue('');
    var LeadsList = this.Leads.filter(X => X.stream === +stream);
    this.practiceLeads = LeadsList;
  }

  getProposaldata(ID: any) {
    this.proposalService.getProposalDetails(ID).subscribe((response: any) => {
      if (response && response.length > 0) {
        this.proposaldata = response[0];
        //this.proposalTitle = this.proposaldata.title;
        //this.porposalStatus = this.proposaldata.status;
        //this.proposalBy = this.proposaldata.rfpUser;
        //this.dataLoad(this.proposaldata);
        this.getAgeing();
      }
    }, (error: any) => {

    })
  }

  getAgeing() {
    const today = moment(new Date());
    const submissiondate = moment(this.proposaldata.rfpSubmissionDate);
    //this.ageing = Math.abs(submissiondate.diff(today, 'days'));
    if (submissiondate > today) {
      this.ageing = Math.abs(submissiondate.diff(today, 'days'));
    } else {
      this.ageing = -1;
    }
    console.log(this.ageing)
  }

  getProposalTracking() {
    if (this.role === ProposalUsers.SalesLead) {
      this.steps = stepsForSL;
    } else if (this.role === ProposalUsers.PracticeLead) {
      this.steps = stepsForPRL;
    } else if (this.role === ProposalUsers.PursuitTeamLead) {
      this.steps = stepsForPUL;
    } else if (this.role === ProposalUsers.DeliveryTeamLead) {
      this.steps = stepsForDL;
    }
  }

  createForms() {
    this.genearteBasicForm();
    this.genearteScheduleForm();
    this.genearteDocumentsForm();
    this.genearteQuestionnaireForm();
    this.genearteAssignmentForm();
  }

  genearteBasicForm() {
    this.formBasicProposal = this.formBuilder.group({
      id: new FormControl(0),
      rfpUser: new FormControl(),
      rfpCode: new FormControl(),
      status: new FormControl(0),
      practiceID: new FormControl(),
      practiceLead: new FormControl(),
      poc: new FormControl(),
      requestType: new FormControl(''),
      customer: new FormControl(''),
      locationID: new FormControl(''),
      releaseDate: new FormControl(''),
      rfpSubmissionDate: new FormControl(''),
      opportunityName: new FormControl(''),
      scope: new FormControl(''),
      description: new FormControl(''),
    });
  }

  genearteScheduleForm() {
    this.formSchedule = this.formBuilder.group({
      schedule: this.formBuilder.array([this.createScheduleForm()])
    })
  }

  createScheduleForm(): FormGroup {
    return this.formBuilder.group({
      scheduleID: new FormControl(0),
      milestone: new FormControl(''),
      status: new FormControl(''),
      scheduleStartDate: new FormControl(''),
      scheduleEndDate: new FormControl(''),
      remarks: new FormControl('')
    });
  }

  addNewSchedule() {
    this.scheduleForm = this.formSchedule.get('schedule') as FormArray;
    this.scheduleForm.push(this.createScheduleForm());
  }

  removeSchedule(index: number) {
    this.scheduleForm = this.formSchedule.get('schedule') as FormArray;
    this.scheduleForm.removeAt(index);
  }

  genearteDocumentsForm() {
    this.formDocuments = this.formBuilder.group({
      documents1: this.formBuilder.array([this.createDocumentForm()]),
      documents2: this.formBuilder.array([this.createDocumentForm()]),
      documents3: this.formBuilder.array([this.createDocumentForm()])
    })
  }

  createDocumentForm(): FormGroup {
    return this.formBuilder.group({
      documentId: new FormControl(0),
      documentName: new FormControl(''),
      documentExt: new FormControl(''),
      documentType: new FormControl(''),
      document: new FormControl('')
    });
  }

  addNewDocument(form: any) {
    this.documentsForm = this.formDocuments.get(form) as FormArray;
    this.documentsForm.push(this.createDocumentForm());
  }

  removeDocument(form: any, index: number) {
    this.documentsForm = this.formDocuments.get(form) as FormArray;
    this.documentsForm.removeAt(index);
  }

  genearteQuestionnaireForm() {
    this.formQuestionnaire = this.formBuilder.group({
      questionnaire: this.formBuilder.array([this.createQuestionnaireForm()])
    })
  }

  createQuestionnaireForm(): FormGroup {
    return this.formBuilder.group({
      questionnaireID: new FormControl(0),
      questionnaireArea: new FormControl(''),
      questions: this.formBuilder.array([this.createQuestionsForm()])
    });
  }

  createQuestionsForm(): FormGroup {
    return this.formBuilder.group({
      questionID: new FormControl(0),
      question: new FormControl(''),
      answer: new FormControl(''),
      response: new FormControl(''),
      comments: new FormControl('')
    });
  }

  addNewQuestionnaire() {
    this.questionnaireForm = this.formQuestionnaire.get('questionnaire') as FormArray;
    this.questionnaireForm.push(this.createQuestionnaireForm());
  }

  removeQuestionnaire(index: number) {
    this.questionnaireForm = this.formQuestionnaire.get('questionnaire') as FormArray;
    this.questionnaireForm.removeAt(index);
  }

  addNewQuestion(parentIndex: number) {
    const questionnaireArray = this.formQuestionnaire.get('questionnaire') as FormArray;
    const questionsArray = questionnaireArray.at(parentIndex).get('questions') as FormArray;
    questionsArray.push(this.createQuestionsForm());
  }

  removeQuestion(parentIndex: number, index: number) {
    const questionnaireArray = this.formQuestionnaire.get('questionnaire') as FormArray;
    const questionsArray = questionnaireArray.at(parentIndex).get('questions') as FormArray;
    questionsArray.removeAt(index);
  }

  genearteAssignmentForm() {
    this.formAssignment = this.formBuilder.group({
      assignment: this.formBuilder.array([this.craeteAssignmentForm()])
    })

    //Temporary
    this.addNewAssignment();
    this.addNewAssignment();
    this.addNewAssignment();
  }

  craeteAssignmentForm(): FormGroup {
  return this.formBuilder.group({
    assignmentID: new FormControl(),
    task: new FormControl(),
    assignedTo: new FormControl(),
    date: new FormControl(),
    status: new FormControl()
  });
  }

  addNewAssignment() {
    this.assignmentForm = this.formAssignment.get('assignment') as FormArray;
    this.assignmentForm.push(this.craeteAssignmentForm());
  }

  removeAssignment(index: number) {
    this.assignmentForm = this.formAssignment.get('assignment') as FormArray;
    this.assignmentForm.removeAt(index);
  }

  fileInput(formName: any, event: any, index: number) {
    const file = event.target.files[0];
    const fileName = file.name;
    const fileExt = fileName.split('.').pop();
    const fileType = file.type;

    const control = (<FormArray>this.formDocuments.controls[formName]).at(index);
    control['controls'].documentName.setValue(fileName);
    control['controls'].documentExt.setValue(fileExt);
    control['controls'].documentType.setValue(fileType);
    control['controls'].document.setValue(file);
  }

  getDocumentImage(extension: string) {
    extension = extension.toLowerCase();
    if (extension === 'jpg' || extension === 'jpeg') {
      return '../../assets/images/FileFormats/JPG.svg';
    } else if (extension === 'pptx' || extension === 'ppt') {
      return '../../assets/images/FileFormats/PPT.svg';
    } else if (extension === 'doc' || extension === 'docx') {
      return '../../assets/images/FileFormats/DOC.svg';
    } else if (extension === 'csv') {
      return '../../assets/images/FileFormats/CSV.svg';
    } else if (extension === 'exe') {
      return '../../assets/images/FileFormats/EXE.svg';
    } else if (extension === 'mp3') {
      return '../../assets/images/FileFormats/MP3.svg';
    } else if (extension === 'mp4') {
      return '../../assets/images/FileFormats/MP4.svg';
    } else if (extension === 'pdf') {
      return '../../assets/images/FileFormats/PDF.svg';
    } else if (extension === 'png') {
      return '../../assets/images/FileFormats/PNG.svg';
    } else if (extension === 'svg') {
      return '../../assets/images/FileFormats/SVG.svg';
    } else if (extension === 'txt') {
      return '../../assets/images/FileFormats/TXT.svg';
    } else if (extension === 'xls' || extension === 'xlsx') {
      return '../../assets/images/FileFormats/XLS.svg';
    } else if (extension === 'zip') {
      return '../../assets/images/FileFormats/ZIP.svg';
    } else if (extension === 'new') {
      return '../../assets/images/FileFormats/FILE_ADD.svg';
    } else {
      return '../../assets/images/FileFormats/FILE.svg';
    }
  }

  tabSelection(event: any) {
    this.selectedTab = event.index;
  }

  save() {
    
    if (this.role === ProposalUsers.SalesLead) {
      this.steps = stepsForPRL;
    } else if (this.role === ProposalUsers.PracticeLead) {
      this.steps = stepsForPUL;
    } else if (this.role === ProposalUsers.PursuitTeamLead) {
      this.steps = stepsForDL;
    } else if (this.role === ProposalUsers.DeliveryTeamLead) {
      this.steps = stepsForDLComplete;
    }

    this.notificationService.showSuccess("Data saved succesfully.", "Success !");

  }

  next() {
    this.selectedTab += 1;
    if (this.selectedTab > 5) this.selectedTab = 0;
  }

  back() {
    this.selectedTab -= 1;
    if (this.selectedTab < 0) this.selectedTab = 0;
  }

  dataLoad() {

    if (this.proposaldata) {
      this.formBasicProposal.patchValue(this.proposaldata);
      this.formBasicProposal.get('practiceID').setValue((this.proposaldata.practiceID).toString());
      this.formBasicProposal.get('locationID').setValue((this.proposaldata.locationID).toString());
      this.streamChange(this.proposaldata.practiceID);
      this.formBasicProposal.get('practiceLead').setValue(this.proposaldata.practiceLead);
    }
    


    if (this.scheduleData.length > 0) {
      this.removeSchedule(0);
      for (let i = 0; i < this.scheduleData.length; i++) {
        this.addNewSchedule();
      }

      this.formSchedule.get('schedule').patchValue(this.scheduleData);
    }


  }

  getMilestoneName(id: any) {
    var data = MileStones.filter(data => data.mileStoneId === +id);
    if (data.length > 0) {
      return data[0].mileStoneName;
    }
  }

  ExportQuesions() {

  }

  uploadQuesions() {

  }

  downloadTemplate() {

  }

  approve() {
    this.notificationService.showSuccess("Approved.", "Success !");
  }

  reject() {
    this.notificationService.showAlert("Sent for Review", "Success !");
  }
}
