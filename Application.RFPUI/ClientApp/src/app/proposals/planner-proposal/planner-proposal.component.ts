import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ProposalService } from '../proposal.service';
import { NotificationService } from '../../services/notification.service';
import { SessionService } from '../../global/session.service';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { RequestTypes, Streams } from '../../global/constants';
import { Session, Stream } from '../../global/enum';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-planner-proposal',
  templateUrl: './planner-proposal.component.html',
  styleUrls: ['./planner-proposal.component.css']
})
export class PlannerProposalComponent implements OnInit {

  newProposalForm: FormGroup;
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
      rfpUser: new FormControl(),
      rfpCode: new FormControl(0),
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

  // need to changed, based on the userlist data
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

      newProposalData.rfpUser = this.sessionService.getSession(Session.userName);

      const newProposalFormData: FormData = new FormData();
      newProposalFormData.append('proposalData', JSON.stringify(newProposalData));

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

  back() {
    this.router.navigate(['/app/new/plannerName']);
  }

}
