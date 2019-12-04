import { Component, OnInit } from '@angular/core';
import { ProposalService } from '../proposal.service';


@Component({
  selector: 'app-planner-view',
  templateUrl: './planner-view.component.html',
  styleUrls: ['./planner-view.component.css']
})
export class PlannerViewComponent implements OnInit {

  sections: any;
  steps: any[];
  proposalTitle: string;
  porposalStatus: string;
  proposalBy: string;
  proposaldata: any = [];

  constructor(private proposalService: ProposalService) {
    this.sections = [
      {
        sectionId: 1,
        sectionName: 'Basic Info'
      },
      {
        sectionId: 2,
        sectionName: 'Schedule'
      },
      {
        sectionId: 3,
        sectionName: 'Documents'
      }
    ]


    this.steps = [
      { dateLabel: '10 Oct, 2019 12:10', title: 'Proposal Submit', acceptance: 'Yes' },
      { dateLabel: '11 Oct, 2019 10:10', title: 'Rejected by PL', acceptance: 'No' },
      { dateLabel: 'Date', title: 'Resubmit', acceptance: 'Pending' },
      { dateLabel: 'Date', title: 'Approved by Practice Lead', acceptance: 'Pending' },
      { dateLabel: 'Date', title: 'Approved by Pursuit Lead', acceptance: 'Pending' },
      { dateLabel: 'Date', title: 'Accepted by Delivery Lead', acceptance: 'Pending' }
    ];
  }

  ngOnInit() {
  }


  getProposaldata(RFPCode: any) {
    this.proposalService.getProposalDetails(RFPCode).subscribe((response: any) => {
      if (response && response.length > 0) {
        this.proposaldata = response[0];
        this.proposalTitle = this.proposaldata.title;
        this.porposalStatus = this.proposaldata.status;
        this.proposalBy = this.proposaldata.rfpUser;
        //this.dataLoad(this.proposaldata);
      }
    }, (error: any) => {

    })
  }
}
