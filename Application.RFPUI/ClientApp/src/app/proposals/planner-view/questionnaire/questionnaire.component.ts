import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';


@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  formQuestionnaire: FormGroup;
  questionnaireForm: FormArray;
  questionForm: FormArray;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForms();
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

  ExportQuesions() {

  }

  uploadQuesions() {

  }

  downloadTemplate() {

  }

}
