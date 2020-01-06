import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ProposalService } from '../proposal.service';
import { NotificationService } from '../../services/notification.service';
import { SessionService } from '../../global/session.service';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { RequestTypes, Streams } from '../../global/constants';
import { Session, Stream, ProposalRequestType } from '../../global/enum';
import { ProposalRequestModel } from '../../view-models/proposal-request-view-model';

@Component({
  selector: 'app-planner-proposal',
  templateUrl: './planner-proposal.component.html',
  styleUrls: ['./planner-proposal.component.css']
})
export class PlannerProposalComponent implements OnInit {

  newProposalForm: FormGroup;
  newRequest: ProposalRequestModel;
  requestTypes: any;
  practiceTypes: any;
  practiceLeads: any;
  locations: any;
  Leads: any;


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
    this.getPracticeLeads();
    this.newProposalForm.get('practiceType').setValue(Id);
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
      this.streamChange(this.activatedRoute.snapshot.params.Id);
    }, (error) => {

    })
  }

  streamChange(stream: any) {
    this.newProposalForm.get('practiceLead').setValue('');
    var LeadsList = this.Leads.filter(X => X.stream === +stream);
    this.practiceLeads = LeadsList;
  }

  submit() {

    console.log(this.newProposalForm);
    if (this.newProposalForm.valid) {

      const newProposalData = (<any>Object).assign({}, this.newProposalForm.value);
      console.log(newProposalData);

      this.newRequest = new ProposalRequestModel();
      this.newRequest.id = 0;
      this.newRequest.requestType = newProposalData.requestType;
      //this.newRequest.rfpCode = '';
      this.newRequest.opportunityName = newProposalData.title;
      this.newRequest.releaseDate = new Date(newProposalData.requestedDate);
      this.newRequest.practiceID = newProposalData.practiceType;
      //this.newRequest.practiceName = newProposalData.
      this.newRequest.practiceLead = newProposalData.practiceLead;
      this.newRequest.customer = newProposalData.customer;
      this.newRequest.locationID = newProposalData.location;
      //this.newRequest.locationName = newProposalData.
      this.newRequest.scope = newProposalData.scope;
      this.newRequest.description = newProposalData.description;
      //this.newRequest.submittedBy = newProposalData.
      //this.newRequest.submittedByName = newProposalData.
      this.newRequest.createdDate = new Date();
      this.newRequest.modifiedDate = new Date();
      this.newRequest.rfpSubmissionDate = new Date(newProposalData.submissionDate);
      this.newRequest.poc = newProposalData.poc;
      this.newRequest.additionalRemarks = '';
      this.newRequest.proposalStatus = ProposalRequestType.Drafted;
      //this.newRequest.ProposalStatusName = newProposalData.

      //* Converting json to formdata *//
      //const newProposalFormData: FormData = new FormData();
      //newProposalFormData.append('proposalData', JSON.stringify(newProposalData));



      this.proposalService.addProposal(this.newRequest).subscribe((response: any) => {
        console.log(response);

        if (response && response === true) {
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

       //this.notificationService.showSuccess("New Proposal submitted successfully.", "Success !");

       //this.router.navigate(['/app/proposals/view/IKEA']);

    } else {


      this.notificationService.showAlert("Please fill all the required details to submit the proposal.", "Alert !");
    }


  }

  back() {
    this.router.navigate(['/app/new/plannerName']);
  }

}
