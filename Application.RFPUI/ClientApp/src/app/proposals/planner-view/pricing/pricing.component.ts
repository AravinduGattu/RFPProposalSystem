import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { GridOptions } from 'ag-grid-community/main';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  public gridOptionsPricing: GridOptions;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.gridOptionsPricing = <GridOptions>{};
    this.gridOptionsPricing.defaultColDef = { headerClass: 'custom-ag-header' };
    this.gridOptionsPricing.editType = 'fullRow';
    this.gridOptionsPricing.stopEditingWhenGridLosesFocus = true;
    this.gridOptionsPricing.suppressMovableColumns = true;
    this.gridOptionsPricing.headerHeight = 30;
    this.gridOptionsPricing.singleClickEdit = true;
    //this.gridOptionsPricing.rowData = [];
    //this.gridOptionsPricing.columnDefs = [];
    this.gridOptionsPricing.defaultColDef.sortable = true
    this.gridOptionsPricing.defaultColDef.resizable = true
  }

  ngOnInit() {
    
  }

  columnDefs = [
    {
      headerName: 'S.No',
      field: '',
      width: 50,
      sortable: true,
      resizable: true
    },
    {
      headerName: 'Role',
      field: 'model',
      width: 185,
      sortable: true,
      resizable: true
    },
    {
      headerName: 'Description',
      field: 'price',
      width: 185,
      sortable: true,
      resizable: true
    },
    {
      headerName: 'Count',
      field: 'price',
      width: 110,
      sortable: true,
      resizable: true
    },
    {
      headerName: 'Allocation',
      field: 'price',
      width: 110,
      sortable: true,
      resizable: true
    },
    {
      headerName: 'Location',
      field: 'price',
      width: 155,
      sortable: true,
      resizable: true
    },
    {
      headerName: 'Total Hours',
      field: 'price',
      width: 110,
      sortable: true,
      resizable: true
    },
    {
      headerName: 'Total Cost',
      field: 'price',
      width: 110,
      sortable: true,
      resizable: true
    }
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

}
