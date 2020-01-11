import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ProposalService } from '../../proposal.service';
import { NotificationService } from '../../../services/notification.service';
import { SessionService } from '../../../global/session.service';
import { CommonService } from '../../../services/common.service';
import { Router } from '@angular/router';
import { RequestTypes, Streams } from '../../../global/constants';
import { Session, Stream, ProposalRequestType } from '../../../global/enum';
import { ProposalRequestModel } from '../../../view-models/proposal-request-view-model';

@Component({
  selector: 'app-basic-proposal',
  templateUrl: './basic-proposal.component.html',
  styleUrls: ['./basic-proposal.component.css']
})
export class BasicProposalComponent implements OnInit {

  newProposalForm: FormGroup;
  newRequest: ProposalRequestModel;
  requestTypes: any;
  practiceTypes: any;
  practiceLeads: any;
  locations: any;
  Leads: any;

  proposaldata: ProposalRequestModel;

  @Input() new: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private proposalService: ProposalService,
    private notificationService: NotificationService,
    private router: Router,
    private sessionService: SessionService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.requestTypes = RequestTypes;
    this.practiceTypes = Streams;
    var Id = this.activatedRoute.snapshot.params.Id;
    this.createForm();
    this.getLocations();

    this.newProposalForm.get('rfpCode').disable();
    if (this.new === true) {
      this.newProposalForm.get('practiceType').setValue(Id);
      this.getPracticeLeads();
    } else {
      this.getProposaldata(+Id);
    }
    
  }

  createForm() {
    this.newProposalForm = this.formBuilder.group({
      id: new FormControl(0),
      rfpUser: new FormControl(),
      rfpCode: new FormControl(),
      status: new FormControl(0),
      practiceType: new FormControl(),
      practiceLead: new FormControl(),
      poc: new FormControl(),
      requestType: new FormControl(''),
      customer: new FormControl(''),
      location: new FormControl(''),
      requestedDate: new FormControl(''),
      submissionDate: new FormControl(''),
      title: new FormControl(''),
      scope: new FormControl(''),
      description: new FormControl(''),
      additionalRemarks: new FormControl('')
    });
  }

  getLocations() {
    this.commonService.getLocationList().subscribe((response: any) => {
      this.locations = response;
    }, (error) => {

    })
  }

  getPracticeLeads() {
    this.commonService.getPracticeLeadsList().subscribe((response: any) => {
      this.Leads = response;
      if (this.new === true) {
        this.streamChange(this.activatedRoute.snapshot.params.Id);
      } else {
        this.dataLoad();
      }
    }, (error) => {

    })
  }

  streamChange(stream: any) {
    this.newProposalForm.get('practiceLead').setValue('');
    var LeadsList = this.Leads.filter(X => X.stream === +stream);
    this.practiceLeads = LeadsList;
  }

  getProposaldata(ID: any) {
    this.proposalService.getProposalDetails(ID).subscribe((response: any) => {
      if (response && response.length > 0) {
        this.proposaldata = response[0];
        this.getPracticeLeads();
      }
    }, (error: any) => {

    })
  }

  refreshData() {
    var Id = this.activatedRoute.snapshot.params.Id;
    this.proposalService.getProposalDetails(Id).subscribe((response: any) => {
      if (response && response.length > 0) {
        this.proposaldata = response[0];
        this.dataLoad();
      }
    }, (error: any) => {

    })
  }

  dataLoad() {
    this.streamChange(this.proposaldata.practiceID);
    this.newProposalForm.get('id').setValue(this.proposaldata.id);
    this.newProposalForm.get('rfpCode').setValue(this.proposaldata.rfpCode);
    this.newProposalForm.get('practiceType').setValue((this.proposaldata.practiceID).toString());
    this.newProposalForm.get('practiceLead').setValue(this.proposaldata.practiceLead);
    this.newProposalForm.get('poc').setValue(this.proposaldata.poc);
    this.newProposalForm.get('requestType').setValue(this.proposaldata.requestType);
    this.newProposalForm.get('customer').setValue(this.proposaldata.customer);
    this.newProposalForm.get('location').setValue((this.proposaldata.locationID).toString());
    this.newProposalForm.get('requestedDate').setValue(this.proposaldata.releaseDate);
    this.newProposalForm.get('submissionDate').setValue(this.proposaldata.rfpSubmissionDate);
    this.newProposalForm.get('title').setValue(this.proposaldata.opportunityName);
    this.newProposalForm.get('scope').setValue(this.proposaldata.scope);
    this.newProposalForm.get('description').setValue(this.proposaldata.description);
    this.newProposalForm.get('additionalRemarks').setValue(this.proposaldata.additionalRemarks);
    this.newProposalForm.get('status').setValue(this.proposaldata.proposalStatus);
  }

  submit() {
    if (this.newProposalForm.valid) {

      const newProposalData = (<any>Object).assign({}, this.newProposalForm.value);

      this.newRequest = new ProposalRequestModel();
      this.newRequest.requestType = newProposalData.requestType;
      this.newRequest.opportunityName = newProposalData.title;
      this.newRequest.releaseDate = new Date(newProposalData.requestedDate);
      this.newRequest.practiceID = newProposalData.practiceType;
      this.newRequest.practiceLead = newProposalData.practiceLead;
      this.newRequest.customer = newProposalData.customer;
      this.newRequest.locationID = newProposalData.location;
      this.newRequest.scope = newProposalData.scope;
      this.newRequest.description = newProposalData.description;
      this.newRequest.modifiedDate = new Date();
      this.newRequest.rfpSubmissionDate = new Date(newProposalData.submissionDate);
      this.newRequest.poc = newProposalData.poc;
      this.newRequest.additionalRemarks = newProposalData.additionalRemarks;

      if (this.new === true) {
        this.newRequest.id = 0;
        this.newRequest.proposalStatus = ProposalRequestType.Drafted;
        this.newRequest.createdDate = new Date();
      } else {
        this.newRequest.id = newProposalData.id;
        this.newRequest.createdDate = new Date(this.proposaldata.createdDate);
        this.newRequest.proposalStatus = newProposalData.status;
        this.newRequest.rfpCode = this.proposaldata.rfpCode;
        this.newRequest.createdBy = this.proposaldata.createdBy;
      }

      //* Converting json to formdata *//
      //const newProposalFormData: FormData = new FormData();
      //newProposalFormData.append('proposalData', JSON.stringify(newProposalData));

      this.proposalService.addProposal(this.newRequest).subscribe((response: any) => {
        if (response && response === true) {
          if (this.new === true) {
            this.notificationService.showSuccess("New Proposal submitted successfully.", "Success !");
            this.router.navigate(['/app/proposals']);
          } else {
            this.notificationService.showSuccess("Proposal updated successfully.", "Success !");
            this.refreshData();
          }
        } else {
          this.notificationService.showError(JSON.stringify(response), 'Error');
        }
      }, (error: any) => {
        if (error.status === 200) {
          this.notificationService.showError(JSON.stringify(error.error.text), "Error !");
        } else {
          this.notificationService.showError(error.status + error.statusText, "Error !");
        }
      });
    } else {
      this.notificationService.showAlert("Please fill all the required details to save the proposal.", "Alert !");
    }
  }
}
