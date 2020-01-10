import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-categories',
  templateUrl: './employee-categories.component.html',
  styleUrls: ['./employee-categories.component.css']
})
export class EmployeeCategoriesComponent implements OnInit {
  EmpCatForm: FormGroup;
  p_query: string;
    vload: any;
  data_Source: any;
  displayedColumns;
  v_searchbar = true;
  constructor() { }

  ngOnInit() {
    this.EmpCatForm = new FormGroup({
      
      emp_Id: new FormControl(''),
      emp_Name: new FormControl('', [Validators.pattern('[a-zA-Z, ]+$')]),
      email_Id: new FormControl(''),
      edge_Practice: new FormControl(''),
      coe: new FormControl(''),
      category: new FormControl(''),
      subCategory: new FormControl('')
          
    });

  }
  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
  }

  m_search() {
    this.p_query = "SELECT * FROM pact_rmg.view_emp_categories";


  }

}
