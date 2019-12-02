import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planner-name',
  templateUrl: './planner-name.component.html',
  styleUrls: ['./planner-name.component.css']
})
export class PlannerNameComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  createProposal() {
    this.router.navigate(['/app/plannerProposal']);
  }

  createNew(Stream: number) {
    this.router.navigate(['/app/new/plannerProposal/' + Stream]);
  }

}
