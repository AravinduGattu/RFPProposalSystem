import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarConfig, MatProgressSpinner, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ProposalRequestModel } from '../view-models/proposal-request-view-model';
import { Router } from '@angular/router';
import { ProposalService } from './proposal.service';
import { appConstants } from '../global/constants';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css']
})
export class ProposalsComponent implements OnInit {

  dataSource = new MatTableDataSource<ProposalRequestModel>();
  data: ProposalRequestModel[];
  filterText: string;
  constants: any;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ['SNo', 'rfpCode', 'actions', 'opportunityName', 'requestType', 'proposalStatusName', 'createdBy', 'releaseDate'];


  constructor(private router: Router,
    private proposalService: ProposalService) {
    this.data = [];
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.filterText = filterValue;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.constants = appConstants;
    this.getProposals();   
  }

  getProposals() {
    this.proposalService.getProposals().subscribe((response: any) => {

      if (response) {
        this.data = response;
        this.dataSource.data = this.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
      }
    }, error => (
      console.log(error)
    ));
  }

  newProposal() {
    this.router.navigate(['/app/newProposal']);
  }

  approve(i: number, data: any) {
    alert(data.approveTxt);
  }

  reject(i: number, data: any) {
    alert(data.rejectTxt);
  }

}
