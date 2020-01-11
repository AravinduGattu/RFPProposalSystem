import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community/main';
import { ActivatedRoute } from '@angular/router';
import { DropdownEditorComponent } from '../../../cell-render/dropdown-renderer.component';
import { EditCellRenderComponent } from '../../../cell-render/editcell-renderer.component';
import { CommonService } from '../../../services/common.service';
import { ProposalService } from '../../../proposals/proposal.service';
import { PricingModel } from '../../../view-models/proposal-request-view-model';
import { NotificationService } from '../../../services/notification.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  gridOptionsPricing: GridOptions;
  roles: any;
  locations: any;
  pricingNewRows = 0;
  proposalID: number;
  updatePricingIds: any[];
  updatePricings: PricingModel[];
  requiredFields: any[];
  isRequired: boolean;
  rowData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private proposalService: ProposalService,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) {
    this.roles = {
      '1': 'Employee',
      '2': 'Manager'
    };

    this.requiredFields = ['role', 'count', 'allocation', 'locationID', 'totalHours', 'totalCost'];

    this.gridOptionsPricing = <GridOptions>{};
    this.gridOptionsPricing.defaultColDef = { headerClass: 'custom-ag-header' };
    this.gridOptionsPricing.editType = 'fullRow';
    this.gridOptionsPricing.stopEditingWhenGridLosesFocus = true;
    this.gridOptionsPricing.suppressMovableColumns = true;
    this.gridOptionsPricing.headerHeight = 30;
    this.gridOptionsPricing.singleClickEdit = true;
    this.gridOptionsPricing.rowData = [];
    this.gridOptionsPricing.columnDefs = [];
    this.gridOptionsPricing.frameworkComponents = {
      dropdownEditor: DropdownEditorComponent,
      cellEditor: EditCellRenderComponent
    };
    this.gridOptionsPricing.rowSelection = 'multiple';
    this.gridOptionsPricing.getRowNodeId = data => data.id;
    this.gridOptionsPricing.onRowValueChanged = event => {
        let exists = false;
      this.updatePricingIds.forEach(element => {
        if (element === event.data.id) {
            exists = true;
          }
        });
        if (!exists) {
          this.updatePricingIds.push(event.data.id);
        }
      }
  }

  ngOnInit() {
    this.proposalID = this.activatedRoute.snapshot.params.Id;
    this.getLocations();
    this.updatePricingIds = [];
  }

  getLocations() {
    this.commonService.getLocationList().subscribe((response: any) => {
      if (response && response.length > 0) {
        this.locations = this.toLocationObject(response);
        this.getPricingData();
      }
    }, (error) => {

    })
  }

  toLocationObject(arr) {
    const reducer = (map, obj) => ((map[obj.id] = obj.locationName), map);
    return arr.reduce(reducer, {});
  }

  getPricingData() {
    this.updatePricingIds = [];
    this.proposalService.getPricingDetails(this.proposalID).subscribe((response: any) => {
      if (response) {
        this.rowData = response;
        this.gridOptionsPricing.api.setColumnDefs(this.createColumnDefs());
        this.gridOptionsPricing.api.setRowData(this.rowData);
      }
    })
  }

  createColumnDefs() {
    return [
      {
        headerName: '',
        field: '',
        width: 35,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        filter: true
      },
      {
        headerName: 'S.No',
        field: '',
        width: 50,
        sortable: true,
        resizable: true
      },
      {
        headerName: 'Role *',
        field: 'role',
        width: 180,
        sortable: true,
        resizable: true,
        cellEditor: 'dropdownEditor',
        cellEditorParams: {
          dropdownvalues: this.roles
        },
        refData: this.roles,
        editable: true
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 180,
        sortable: true,
        resizable: true,
        editable: true,
        cellEditor: 'cellEditor',
        cellEditorParams: { maxlength: 150, inputtype: 'text' }
      },
      {
        headerName: 'Count *',
        field: 'count',
        width: 110,
        sortable: true,
        resizable: true,
        cellEditor: 'cellEditor',
        cellEditorParams: { maxlength: 10, inputtype: 'number' },
        editable: true
      },
      {
        headerName: 'Allocation *',
        field: 'allocation',
        width: 100,
        sortable: true,
        resizable: true,
        cellEditor: 'cellEditor',
        cellEditorParams: { maxlength: 10, inputtype: 'number' },
        editable: true
      },
      {
        headerName: 'Location *',
        field: 'locationID',
        width: 150,
        sortable: true,
        resizable: true,
        cellEditor: 'dropdownEditor',
        cellEditorParams: {
          dropdownvalues: this.locations
        },
        refData: this.locations,
        editable: true
      },
      {
        headerName: 'Total Hours *',
        field: 'totalHours',
        width: 110,
        sortable: true,
        resizable: true,
        cellEditor: 'cellEditor',
        cellEditorParams: { maxlength: 10, inputtype: 'number' },
        editable: true
      },
      {
        headerName: 'Total Cost *',
        field: 'totalCost',
        width: 110,
        sortable: true,
        resizable: true,
        cellEditor: 'cellEditor',
        cellEditorParams: { maxlength: 10, inputtype: 'number' },
        editable: true
      }
    ]
  }

  getSerialNumber() {
    const index = this.gridOptionsPricing
  }

  addNewRecord() {
    this.gridOptionsPricing.api.ensureIndexVisible(0);
    const newPricing = this.createPricingRow();
    this.gridOptionsPricing.api.updateRowData({ add: [newPricing], addIndex: 0 });
  }

  createPricingRow() {
    const newRow = new PricingModel();
    newRow.id = -1 - this.pricingNewRows;
    newRow.allocation = null;
    newRow.count = null;
    newRow.description = null;
    newRow.locationID = null;
    newRow.proposalID = this.proposalID;
    newRow.role = null;
    newRow.totalCost = null;
    newRow.totalHours = null;

    this.pricingNewRows++;

    return newRow;
  }

  save() {
    //alert(this.updatePricings.length);
    this.updatePricings = [];
    this.isRequired = false;

    if (this.updatePricingIds.length === 0) {
      this.notificationService.showAlert("Nothing to Save.", "Alert !");
    } else {
      this.updatePricingIds.forEach(id => {
        const rowDetails = this.gridOptionsPricing.api.getRowNode(id.toString());

        if (rowDetails.data.id || rowDetails.data.id || rowDetails.data.id ||
          rowDetails.data.id || rowDetails.data.id) {
          this.requiredFields.forEach(Expelement => {
            if (rowDetails.data[Expelement] === '') {
              this.isRequired = true;
            }
          });

          const updatedData = rowDetails.data;

          if (id > 0) {
            this.updatePricings.push({
              id: updatedData.id,
              allocation: updatedData.allocation,
              count: updatedData.count,
              description: updatedData.description,
              locationID: updatedData.locationID,
              proposalID: updatedData.proposalID,
              role: updatedData.role,
              totalCost: updatedData.totalCost,
              totalHours: updatedData.totalHours
            })
          } else {
            this.updatePricings.push({
              id: 0,
              allocation: updatedData.allocation,
              count: updatedData.count,
              description: updatedData.description,
              locationID: updatedData.locationID,
              proposalID: this.proposalID,
              role: updatedData.role,
              totalCost: updatedData.totalCost,
              totalHours: updatedData.totalHours
            })
          }
        } else {
          //this.notificationService.showAlert("Please fill all required information.", "Alert !");
        }
      });

      if (this.isRequired) {
        this.notificationService.showAlert("Please fill all required information.", "Alert !");
      } else {
        //this.updatePricings.forEach(data => {
        //  this.savePricingData(data);
        //})
        this.savePricingData(this.updatePricings);
      }
    }
  }

  savePricingData(data: PricingModel[]) {
    this.proposalService.savePricingDetails(data).subscribe((response: any) => {
      if (response && response === true) {
        this.notificationService.showSuccess('Pricing details saved', 'Success !');
        this.getPricingData();
      } else {
        this.notificationService.showError('Pricing details save failed', 'Error !');
      }
    }, error => {
        this.notificationService.showError('Pricing details save failed', 'Error !');
    });
  }

  delete() {
    const count = this.gridOptionsPricing.api.getSelectedNodes().length;
    if (count > 0) {
      const dialogRef = this.dialogService.openConfirmationDialog('Are you sure, you want to delete all the selected records ?');

      dialogRef.afterClosed().subscribe(data => {
        if (data === true) {
          this.gridOptionsPricing.api.getSelectedNodes().forEach((element, index) => {
            if (+element.data.id < 0) {
              this.notificationService.showSuccess('Pricing details deleted', 'Success !');
            } else {
              this.deletePricing(+element.data.id);
            }
            if (index === count - 1) {
              this.getPricingData();
            }
          });
        } else {

        }
      })
    } else {
      this.notificationService.showAlert('Please select atleast one record to delete', 'Alert !');
    }
  }



  deletePricing(Id: any) {
    this.proposalService.deletePricingDetails(Id)
      .subscribe(response => {
        if (response && response === true) {
          this.notificationService.showSuccess('Pricing details deleted', 'Success !');
        } else {
          this.notificationService.showError('Pricing details delete failed', 'Error !');
        }
      },
        error => {
          this.notificationService.showError('Pricing details delete failed', 'Error !');
      });
  }
}
