import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ProposalService } from '../proposal.service';
import { NotificationService } from '../../services/notification.service';
import { SessionService } from '../../global/session.service';
import { Router } from '@angular/router';
import { RequestTypes, RFPSampleData } from '../../global/constants';
import { Session } from '../../global/enum';

@Component({
  selector: 'app-planner-proposal',
  templateUrl: './planner-proposal.component.html',
  styleUrls: ['./planner-proposal.component.css']
})
export class PlannerProposalComponent implements OnInit {

  newProposalForm: FormGroup;
  requestTypes: any;


  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private proposalService: ProposalService,
    private notificationService: NotificationService,
    private router: Router,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.requestTypes = RequestTypes;
    var Id = this.activatedRoute.snapshot.params.Id;
    this.createForm();

  }

  createForm() {
    this.newProposalForm = this.formBuilder.group({
      rfpUser: new FormControl(),
      rfpCode: new FormControl(0),
      status: new FormControl('Submitted'),
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
      additionalInformation: new FormControl(''),
      assignedTo: new FormControl(),
      viewers: new FormControl(['']),
    });
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
