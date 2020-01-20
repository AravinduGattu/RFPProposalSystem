import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { QuestionnaireModel, QueFormModel, QFormModel } from '../../../view-models/proposal-request-view-model';
import { ProposalService } from '../../../proposals/proposal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  formQuestionnaire: FormGroup;
  questionnaireForm: FormArray;
  questionForm: FormArray;
  questionData: QuestionnaireModel[];
  questionFormData: QueFormModel[];
  proposalID: any;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private proposalService: ProposalService) { }

  ngOnInit() {
    this.proposalID = this.activatedRoute.snapshot.params.Id;
    this.createForms();
    this.getQuestionnaireData();
  }

  createForms() {
    this.genearteQuestionnaireForm();
  }

  genearteQuestionnaireForm() {
    this.formQuestionnaire = this.formBuilder.group({
      questionnaire: this.formBuilder.array([this.createQuestionnaireForm()])
    })
  }

  createQuestionnaireForm(): FormGroup {
    return this.formBuilder.group({
      area: new FormControl(''),
      questions: this.formBuilder.array([this.createQuestionsForm()])
    });
  }

  createQuestionsForm(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(0),
      proposalID: new FormControl(0),
      question: new FormControl(''),
      answer: new FormControl(''),
      response: new FormControl(''),
      remarks: new FormControl('')
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

  ExportQuesions() {

  }

  uploadQuesions() {

  }

  downloadTemplate() {

  }

  getQuestionnaireData() {
    this.proposalService.getQuestionnaireDetails(this.proposalID).subscribe((response: any) => {
      if (response) {
        console.log(response);
        this.loadData(response);
      }
    })
  }

  loadData(data: QuestionnaireModel[]) {
    this.questionFormData = [];
    const areas = Array.from(new Set(data.map((item: QuestionnaireModel) => item.area)));

    for (let area of areas) {
      const areaData = data.filter(y => y.area === area);
      var questions: QFormModel[] = [];
      for (let a of areaData) {
        questions.push({
          id: a.id,
          proposalID: a.proposalID,
          question: a.question,
          answer: a.answer,
          response: '',
          remarks: a.remarks
        })
      }
      this.questionFormData.push({
        area: area,
        questions: questions
      });
    }

    console.log(this.questionFormData);

    if (this.questionFormData && this.questionFormData.length > 0) {
      this.removeQuestionnaire(0);
      for (let i = 0; i < this.questionFormData.length ; i++) {
        this.addNewQuestionnaire();
        if (this.questionFormData[i].questions.length > 0) {
          this.removeQuestion(i, 0);
          for (let j = 0; j < this.questionFormData[i].questions.length; j++) {
            this.addNewQuestion(i);
          }
        }
      }
    }

    this.formQuestionnaire.get('questionnaire').patchValue(this.questionFormData);
  }

  save() {
    this.questionData = [];
    if (this.formQuestionnaire.valid) {

      const formData  = (<any>Object).assign({}, this.formQuestionnaire.value);
      const data: QueFormModel[]  = formData.questionnaire;

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].questions.length; j++) {
          this.questionData.push({
            id: data[i].questions[j].id,
            //proposalID: data[i].proposalID,
            proposalID: this.proposalID,
            area: data[i].area,
            question: data[i].questions[j].question,
            answer: data[i].questions[j].answer,
            remarks: data[i].questions[j].remarks
          })
        }
      }

      console.log(this.questionData);
      this.saveData(this.questionData);

    } else {
      this.notificationService.showAlert("Please fill all the required details to save.", "Alert !");
    }
  }

  saveData(data: QuestionnaireModel[]) {
    this.proposalService.saveQuestionnaireDetails(data).subscribe((response: any) => {
      if (response && response === true) {
        this.notificationService.showSuccess('Questionnaire details saved', 'Success !');
        this.getQuestionnaireData();
      } else {
        this.notificationService.showError('Questionnaire details save failed', 'Error !');
      }
    }, error => {
        this.notificationService.showError('Questionnaire details save failed', 'Error !');
    });
  }

}
