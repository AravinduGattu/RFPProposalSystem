import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-skillset',
  templateUrl: './reports-skillset.component.html',
  styleUrls: ['./reports-skillset.component.css']
})
export class ReportsSkillsetComponent implements OnInit {

  constructor() { }
  vload: any;
  data_Source: any;
  displayedColumns;
  v_searchbar = true;
  ngOnInit() {
  }


  //to hide the search bar
  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
  }
}
