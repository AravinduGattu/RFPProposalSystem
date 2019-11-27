import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ProposalService } from '../proposal.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { RequestTypes, RFPSampleData } from '../../global/constants';


@Component({
  selector: 'app-new-proposal',
  templateUrl: './new-proposal.component.html',
  styleUrls: ['./new-proposal.component.css']
})
export class NewProposalComponent implements OnInit {

  newProposalForm: FormGroup;
  documentsForm: FormArray;
  scheduleForm: FormArray;
  questionnaireForm: FormArray;
  questionForm: FormArray;
  fileStream: any;
  requestTypes: any;

  constructor(private formBuilder: FormBuilder,
    private proposalService: ProposalService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
    this.requestTypes = RequestTypes;
    this.createForm();
  }

  createForm() {
    this.newProposalForm = this.formBuilder.group({
      // RFPID: new FormControl(0),
      rfpUser: new FormControl(),
      rfpCode: new FormControl(),
      status: new FormControl('Submitted'),
      practiceType: new FormControl(),
      practiceLead: new FormControl(),
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
      // createdBy: new FormControl('P0145011'),
      // createdDate: new FormControl(''),
      // modifiedBy: new FormControl(''),
      // modifiedDate: new FormControl('')
      assignedTo: new FormControl(),
      viewers: new FormControl(['']),
      history: this.formBuilder.array([this.createHistoryForm()]),
      pricing: this.formBuilder.array([this.createPricingForm()])
    });
  }

  createScheduleForm(): FormGroup {
    return this.formBuilder.group({
      // scheduleID: new FormControl(0),
      milestone: new FormControl(''),
      scheduleStartDate: new FormControl(''),
      scheduleEndDate: new FormControl(''),
      remarks: new FormControl('')
    });
  }

  createDocumentForm(): FormGroup {
    return this.formBuilder.group({
      // documentId: new FormControl(0),
      documentName: new FormControl(''),
      documentExt: new FormControl(''),
      // documentType: new FormControl(''),
      // documentStream: new FormControl(''),
      document: new FormControl('')
    });
  }

  createQuestionnaireForm(): FormGroup {
    return this.formBuilder.group({
      // questionnaireID: new FormControl(0),
      questionnaireArea: new FormControl(''),
      questions: this.formBuilder.array([this.createQuestionsForm()])
    });
  }

  createQuestionsForm(): FormGroup {
    return this.formBuilder.group({
      // questionID: new FormControl(0),
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
    //  alert(this.fileStream);
      const control = (<FormArray>this.newProposalForm.controls['documents']).at(index);
      control['controls'].documentName.setValue(fileName);
      control['controls'].documentExt.setValue(fileExt);
      // control['controls'].documentType.setValue(fileType);
      // control['controls'].documentStream.setValue(this.fileStream);
      control['controls'].document.setValue(file);
    // };
  }

  addNewDocument() {
    this.documentsForm = this.newProposalForm.get('documents') as FormArray;
    this.documentsForm.push(this.createDocumentForm());
  }

  removeDocument(index: number) {
    this.documentsForm = this.newProposalForm.get('documents') as FormArray;
    this.documentsForm.removeAt(index);
  }

  addNewSchedule() {
    this.scheduleForm = this.newProposalForm.get('schedule') as FormArray;
    this.scheduleForm.push(this.createScheduleForm());
  }

  removeSchedule(index: number) {
    this.scheduleForm = this.newProposalForm.get('schedule') as FormArray;
    this.scheduleForm.removeAt(index);
  }

  addNewQuestionnaire() {
    this.questionnaireForm = this.newProposalForm.get('questionnaire') as FormArray;
    this.questionnaireForm.push(this.createQuestionnaireForm());
  }

  removeQuestionnaire(index: number) {
    this.questionnaireForm = this.newProposalForm.get('questionnaire') as FormArray;
    this.questionnaireForm.removeAt(index);
  }

  addNewQuestion(parentIndex: number) {
    const questionnaireArray = this.newProposalForm.get('questionnaire') as FormArray;
    const questionsArray = questionnaireArray.at(parentIndex).get('questions') as FormArray;
    questionsArray.push(this.createQuestionsForm());
  }

  removeQuestion(parentIndex: number, index: number) {
    const questionnaireArray = this.newProposalForm.get('questionnaire') as FormArray;
    const questionsArray = questionnaireArray.at(parentIndex).get('questions') as FormArray;
    questionsArray.removeAt(index);
  }

  submit() {

    console.log(this.newProposalForm);
    if (this.newProposalForm.valid) {

      const newProposalData = (<any>Object).assign({}, this.newProposalForm.value);
      console.log(newProposalData);
      delete newProposalData['documents'];
      console.log(newProposalData);
      newProposalData.rfpUser = sessionStorage.getItem('userName');

      const documentList = this.newProposalForm.value.documents;

      // const newProposalFormData = this.createFormData(newProposalData);

      const newProposalFormData: FormData = new FormData();
      newProposalFormData.append('proposalData', JSON.stringify(newProposalData));

      for (let i = 0; i < documentList.length; i++) {
        newProposalFormData.append('file' + ( i + 1), documentList[i].document);
      }

      this.proposalService.addProposal(newProposalFormData).subscribe((response: any) => {
        console.log(response);

        if (response && response.reason === "Success") {
          this.notificationService.showSuccess("New Proposal submitted successfully.", "Success !");
          this.router.navigate(['/app/proposals']);
        } else {
          this.notificationService.showError(JSON.stringify(response), 'Error');
        }
      }, (error: any) => {

          console.log(error);

          if (error.status === 200) {
            this.notificationService.showError(JSON.stringify(error.error.text), "Error !");
          } else {
            this.notificationService.showError(error.status + error.statusText, "Error !");
          }

      });
    } else {
      this.notificationService.showAlert("Please fill all the required details to submit the proposal.", "Alert !");
    }

    
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

  createFormData(object: Object, form?: FormData, namespace?: string): FormData {
  const formData = form || new FormData();
  for (let property in object) {
    if (!object.hasOwnProperty(property) || !object[property]) {
      continue;
    }
    const formKey = namespace ? `${namespace}[${property}]` : property;
    if (object[property] instanceof Date) {
      formData.append(formKey, object[property].toISOString());
    } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
      this.createFormData(object[property], formData, formKey);
    } else {
      formData.append(formKey, object[property]);
    }
  }
  return formData;
  }

  cancel() {
    this.router.navigate(['/app/proposals']);
  }

  fillSampleData() {
    this.dataLoad(RFPSampleData);
  }

  dataLoad(data: any) {
    if (data) {
      if (data.schedule.length > 0) {
        this.removeSchedule(0);
        for (let i = 0; i < data.schedule.length; i++) {
          this.addNewSchedule();
        }
      }
      //if (data.documents.length > 0) {
      //  this.removeDocument(0);
      //  for (let i = 0; i < data.documents.length; i++) {
      //    this.addNewDocument();
      //  }
      //}
      if (data.questionnaire.length > 0) {
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
      this.newProposalForm.patchValue(data);
    }
  }

}

