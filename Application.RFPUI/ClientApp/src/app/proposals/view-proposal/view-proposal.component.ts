import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ProposalData } from '../../global/data-json';
// import * as FileSaver from 'file-saver';
import { ProposalService } from '../proposal.service';
import { RequestTypes } from '../../global/constants';
import { ActivatedRoute } from '@angular/router';
import { Roles } from '../../global/constants';



@Component({
  selector: 'app-view-proposal',
  templateUrl: './view-proposal.component.html',
  styleUrls: ['./view-proposal.component.css']
})
export class ViewProposalComponent implements OnInit {

  RequestJourney: any[];
  steps: any[];
  proposalForm: FormGroup;
  documentsForm: FormArray;
  scheduleForm: FormArray;
  pricingForm: FormArray;
  questionnaireForm: FormArray;
  questionForm: FormArray;
  fileStream: any;
  requestTypes: any;
  rfpCode: string;
  proposalTitle: string;
  porposalStatus: string;
  proposalBy: string;
  role: string;
  roles: object;

  proposaldata: any = [];

  constructor(private formBuilder: FormBuilder,
    private proposalService: ProposalService,
    private activatedRoute: ActivatedRoute) {
    //this.proposaldata = ProposalData;

    this.steps = [
      { dateLabel: '10 Oct, 2019 12:10', title: 'Proposal Submit', acceptance: 'Yes' },
      { dateLabel: '11 Oct, 2019 10:10', title: 'Rejected by PL', acceptance: 'No' },
      { dateLabel: 'Date', title: 'Resubmit', acceptance: 'Pending' },
      { dateLabel: 'Date', title: 'Approved by Practice Lead', acceptance: 'Pending' },
      { dateLabel: 'Date', title: 'Approved by Pursuit Lead', acceptance: 'Pending' },
      { dateLabel: 'Date', title: 'Accepted by Delivery Lead', acceptance: 'Pending' }
    ];
    
    this.RequestJourney = [
          {
            Name: 'Stage 1',
            status: 'Completed',
            statusId: 3,
            dateTime: '09-08-2019'
          },
          {
            Name: 'Stage 2',
            status: 'Completed',
            statusId: 3,
            dateTime: '09-08-2019'
          },
          {
            Name: 'Stage 3',
            status: 'Cancelled',
            statusId: 4,
            dateTime: '09-08-2019',
          },
          {
            Name: 'Stage 4',
            status: 'Work In Progress',
            statusId: 2,
            dateTime: 'Date',
          },
          {
            Name: 'Stage 5',
            status: 'Not Started',
            statusId: 1,
            dateTime: 'Date',
          }
        ];
  }

  ngOnInit() {
    this.rfpCode = this.activatedRoute.snapshot.params.RFPCode;
    this.role = sessionStorage.getItem('role');
    this.requestTypes = RequestTypes;
    this.roles = Roles;
    this.createForm();


    this.getProposaldata(this.rfpCode);
    //this.dataLoad(this.proposaldata);
  }

  getProposaldata(RFPCode: any) {
    this.proposalService.getProposalDetails(RFPCode).subscribe((response: any) => {
      if (response && response.length > 0) {
        this.proposaldata = response[0];
        this.proposalTitle = this.proposaldata.title;
        this.porposalStatus = this.proposaldata.status;
        this.proposalBy = this.proposaldata.rfpUser;
        this.dataLoad(this.proposaldata);
      }
    }, (error: any) => {

    })
  }

  dataLoad(data: any) {
    if (data) {
      if (data.schedule && data.schedule.length > 0) {
        this.removeSchedule(0);
        for (let i = 0; i < data.schedule.length; i++) {
          this.addNewSchedule();
        }
      }
      if (data.documents && data.documents.length > 0) {
        this.removeDocument(0);
          for (let i = 0; i < data.documents.length; i++) {
          this.addNewDocument();
          }
      }
      if (data.questionnaire && data.questionnaire.length > 0) {
        this.removeQuestionnaire(0);
        for (let i = 0; i < data.questionnaire.length; i++) {
          this.addNewQuestionnaire();
          if (data.questionnaire[i].questions.length > 0) {
            this.removeQuestion(i, 0);
            for (let j = 0; j < data.questionnaire[i].questions.length; j++) {
              this.addNewQuestion(i);
            }
          }
        }
      }
      this.proposalForm.patchValue(data);
    }
  }

  createForm() {
    this.proposalForm = this.formBuilder.group({
      RFPID: new FormControl(''),
      rfpCode: new FormControl(''),
      rfpUser: new FormControl(''),
      status: new FormControl(''),
      practiceType: new FormControl(''),
      practiceLead: new FormControl(''),
      requestType: new FormControl(''),
      customer: new FormControl(''),
      location: new FormControl(''),
      requestedDate: new FormControl(''),
      title: new FormControl(''),
      scope: new FormControl(''),
      description: new FormControl(''),
      additionalInformation: new FormControl(''),
      schedule: this.formBuilder.array([this.createScheduleForm()]),
      documents: this.formBuilder.array([this.createDocumentForm()]),
      questionnaire: this.formBuilder.array([this.createQuestionnaireForm()]),
      assignedTo: new FormControl(),
      viewers: new FormControl(['']),
      history: this.formBuilder.array([this.createHistoryForm()]),
      pricing: this.formBuilder.array([this.createPricingForm()])
    });
  }

  createScheduleForm(): FormGroup {
    return this.formBuilder.group({
      scheduleID: new FormControl(0),
      milestone: new FormControl(''),
      scheduleStartDate: new FormControl(''),
      scheduleEndDate: new FormControl(''),
      remarks: new FormControl('')
    });
  }

  createDocumentForm(): FormGroup {
    return this.formBuilder.group({
      documentId: new FormControl(0),
      documentName: new FormControl(''),
      documentExt: new FormControl(''),
      documentType: new FormControl(''),
      // documentStream: new FormControl(''),
      document: new FormControl('')
    });
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
      answer: new FormControl('')
    });
  }

  createHistoryForm(): FormGroup {
    return this.formBuilder.group({
      date: new FormControl(),
      status: new FormControl(),
      acceptance: new FormControl()
    });
  }

  createPricingForm(): FormGroup {
    return this.formBuilder.group({
      role: new FormControl(),
      description: new FormControl(),
      count: new FormControl(),
      allocation: new FormControl(),
      location: new FormControl(),
      //cost: new FormControl(),
      //rate: new FormControl(),
      totalHours: new FormControl(),
      totalCost: new FormControl(),
    });
  }

  fileInput(event: any, index: number) {
    const file = event.target.files[0];
    const fileName = file.name;
    const fileExt = fileName.split('.').pop();
    const fileType = file.type;

    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = e => {
    //  this.fileStream = reader.result;
      const control = (<FormArray>this.proposalForm.controls['documents']).at(index);
      control['controls'].documentName.setValue(fileName);
      control['controls'].documentExt.setValue(fileExt);
      control['controls'].documentType.setValue(fileType);
      // control['controls'].documentStream.setValue(this.fileStream);
      control['controls'].document.setValue(file);
    // };
  }

  addNewDocument() {
    this.documentsForm = this.proposalForm.get('documents') as FormArray;
    this.documentsForm.push(this.createDocumentForm());
  }

  removeDocument(index: number) {
    this.documentsForm = this.proposalForm.get('documents') as FormArray;
    this.documentsForm.removeAt(index);
  }

  addNewSchedule() {
    this.scheduleForm = this.proposalForm.get('schedule') as FormArray;
    this.scheduleForm.push(this.createScheduleForm());
  }

  removeSchedule(index: number) {
    this.scheduleForm = this.proposalForm.get('schedule') as FormArray;
    this.scheduleForm.removeAt(index);
  }

  addNewPricing() {
    this.pricingForm = this.proposalForm.get('pricing') as FormArray;
    this.pricingForm.push(this.createPricingForm());
  }

  removePricing(index: number) {
    this.pricingForm = this.proposalForm.get('pricing') as FormArray;
    this.pricingForm.removeAt(index);
  }

  addNewQuestionnaire() {
    this.questionnaireForm = this.proposalForm.get('questionnaire') as FormArray;
    this.questionnaireForm.push(this.createQuestionnaireForm());
  }

  removeQuestionnaire(index: number) {
    this.questionnaireForm = this.proposalForm.get('questionnaire') as FormArray;
    this.questionnaireForm.removeAt(index);
  }

  addNewQuestion(parentIndex: number) {
    const questionnaireArray = this.proposalForm.get('questionnaire') as FormArray;
    const questionsArray = questionnaireArray.at(parentIndex).get('questions') as FormArray;
    questionsArray.push(this.createQuestionsForm());
  }

  removeQuestion(parentIndex: number, index: number) {
    const questionnaireArray = this.proposalForm.get('questionnaire') as FormArray;
    const questionsArray = questionnaireArray.at(parentIndex).get('questions') as FormArray;
    questionsArray.removeAt(index);
  }

  submit() {
    console.log(this.proposalForm);
    if (this.proposalForm.valid) {
      console.log((<any>Object).assign({}, this.proposalForm.value));
      console.log(this.proposalForm);
      const newProposalData = (<any>Object).assign({}, this.proposalForm.value);
      this.proposalService.addProposal(newProposalData).subscribe((response: any) => {
        alert(response);
      }, error => (alert(error)));
    } else {
      alert('Form is invalid');
    }
  }

  getProcessImage(status: any) {
    if (status === 1) {
      return '../../assets/images/time3.png';
    } else if (status === 2) {
      return '../../assets/images/pending2.png';
    } else if (status === 3) {
      return '../../assets/images/correct2.png';
    } else if (status === 4) {
      return '../../assets/images/cross3.png';
    } else {
      return '../../assets/images/timeline.svg';
    }
  }

  getDocumentImage(extension: string) {
    extension = extension.toLowerCase();
    if (extension === 'jpg' || extension === 'jpeg') {
      return '../../assets/images/FileFormats/JPG.svg';
    } else if (extension === 'pptx' || extension === 'ppt') {
      return '../../assets/images/FileFormats/PPT.svg';
    } else if (extension === 'doc' || extension === 'docx' ) {
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

  downloadFile(doc: any) {
    const byteString = atob(doc.documentStream.split(',')[1]);
    const byteNumbers = new Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    const fileBlob = new Blob([byteArray], { type: doc.documentType });
    const file = new File([fileBlob], doc.documentName, { type: doc.documentType });

    // FileSaver.saveAs(file);
  }

}
