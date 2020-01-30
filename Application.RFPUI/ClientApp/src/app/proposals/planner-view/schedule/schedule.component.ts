import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community/main';
import { ActivatedRoute } from '@angular/router';
import { DropdownEditorComponent } from '../../../cell-render/dropdown-renderer.component';
import { EditCellRenderComponent } from '../../../cell-render/editcell-renderer.component';
import { ButtonRendererComponent } from '../../../cell-render/button-renderer.component';
import { DateRendererComponent } from '../../../cell-render/date-renderer.component';
import { CommonService } from '../../../services/common.service';
import { SerialNumberComponent } from '../../../cell-render/serial-number.component';
import { ProposalService } from '../../../proposals/proposal.service';
import { ScheduleModel } from '../../../view-models/proposal-request-view-model';
import { NotificationService } from '../../../services/notification.service';
import { DialogService } from '../../../services/dialog.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  gridOptionsSchedule: GridOptions;
  roles: any;
  locations: any;
  scheduleNewRows = 0;
  proposalID: number;
  updateScheduleIds: any[];
  updateSchedule: ScheduleModel[];
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

    this.requiredFields = ['milestoneID', 'milestoneStartDate', 'milestoneEndDate', 'status'];

    this.gridOptionsSchedule = <GridOptions>{};
    this.gridOptionsSchedule.defaultColDef = { headerClass: 'custom-ag-header' };
    this.gridOptionsSchedule.editType = 'fullRow';
    this.gridOptionsSchedule.stopEditingWhenGridLosesFocus = true;
    this.gridOptionsSchedule.suppressMovableColumns = true;
    this.gridOptionsSchedule.headerHeight = 30;
    this.gridOptionsSchedule.singleClickEdit = true;
    this.gridOptionsSchedule.rowData = [];
    this.gridOptionsSchedule.columnDefs = [];
    this.gridOptionsSchedule.frameworkComponents = {
      dropdownEditor: DropdownEditorComponent,
      cellEditor: EditCellRenderComponent,
      buttonRenderer: ButtonRendererComponent,
      serialRenderer: SerialNumberComponent,
      dateRenderer: DateRendererComponent
    };
    this.gridOptionsSchedule.rowSelection = 'multiple';
    this.gridOptionsSchedule.getRowNodeId = data => data.id;
    this.gridOptionsSchedule.onRowValueChanged = event => {
      let exists = false;
      this.updateScheduleIds.forEach(element => {
        if (element === event.data.id) {
          exists = true;
        }
      });
      if (!exists) {
        this.updateScheduleIds.push(event.data.id);
      }
    }
  }

  ngOnInit() {
    this.proposalID = this.activatedRoute.snapshot.params.Id;
    this.getLocations();
    this.updateScheduleIds = [];
  }

  getLocations() {
    this.commonService.getLocationList().subscribe((response: any) => {
      if (response && response.length > 0) {
        this.locations = this.toLocationObject(response);
        this.getScheduleData();
      }
    }, (error) => {

    })
  }

  toLocationObject(arr) {
    const reducer = (map, obj) => ((map[obj.id] = obj.locationName), map);
    return arr.reduce(reducer, {});
  }

  getScheduleData() {
    this.proposalService.getScheduleDetails(this.proposalID).subscribe((response: any) => {
      if (response) {
        this.rowData = response;
        this.updateScheduleIds = [];
        this.gridOptionsSchedule.api.setColumnDefs(this.createColumnDefs());
        this.gridOptionsSchedule.api.setRowData(this.rowData);
      }
    })
  }

  createColumnDefs() {
    return [
      {
        headerName: 'S.No',
        cellRenderer: 'serialRenderer',
        width: 50,
        sortable: true,
        resizable: true
      },
      {
        headerName: 'Delete',
        width: 65,
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.deleteRow.bind(this),
          label: 'Delete'
        }
      },
      {
        headerName: 'Milestone *',
        field: 'milestoneID',
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
        headerName: 'Start Date *',
        field: 'milestoneStartDate',
        width: 180,
        sortable: true,
        resizable: true,
        editable: true,
        cellEditor: 'dateRenderer',
      },
      {
        headerName: 'End Date *',
        field: 'milestoneEndDate',
        width: 110,
        sortable: true,
        resizable: true,
        cellEditor: 'dateRenderer',
        editable: true
      },
      {
        headerName: 'Status *',
        field: 'status',
        width: 100,
        sortable: true,
        resizable: true,
        cellEditor: 'cellEditor',
        cellEditorParams: { maxlength: 10, inputtype: 'number' },
        editable: true
      },
      {
        headerName: 'Remarks',
        field: 'remarks',
        width: 150,
        sortable: true,
        resizable: true,
        cellEditor: 'cellEditor',
        cellEditorParams: { maxlength: 100, inputtype: 'text' },
        editable: true
      }
    ]
  }


  addNewRecord() {
    this.gridOptionsSchedule.api.ensureIndexVisible(0);
    const newSchedule = this.createScheduleRow();
    this.gridOptionsSchedule.api.updateRowData({ add: [newSchedule], addIndex: 0 });
    this.gridOptionsSchedule.api.setColumnDefs(this.createColumnDefs());
  }

  createScheduleRow() {
    const newRow = new ScheduleModel();
    newRow.id = -1 - this.scheduleNewRows;
    newRow.proposalID = null;
    newRow.milestoneID = null;
    newRow.milestoneStartDate = null;
    newRow.milestoneEndDate = null;
    newRow.status = this.proposalID;
    newRow.remarks = null;
    
    this.scheduleNewRows++;

    return newRow;
  }

  save() {
    //alert(this.updatePricings.length);
    this.updateSchedule = [];
    this.isRequired = false;

    if (this.updateScheduleIds.length === 0) {
      this.notificationService.showAlert("Nothing to Save.", "Alert !");
    } else {
      this.updateScheduleIds.forEach(id => {
        const rowDetails = this.gridOptionsSchedule.api.getRowNode(id.toString());

        if (rowDetails.data.milestoneID || rowDetails.data.milestoneStartDate || rowDetails.data.milestoneEndDate ||
          rowDetails.data.status) {
          this.requiredFields.forEach(Expelement => {
            if (rowDetails.data[Expelement] === '') {
              this.isRequired = true;
            }
          });

          const updatedData = rowDetails.data;

          if (id > 0) {
            this.updateSchedule.push({
              id: updatedData.id,
              proposalID: updatedData.proposalID,
              milestoneID: updatedData.milestoneID,
              milestoneStartDate: updatedData.milestoneStartDate,
              milestoneEndDate: updatedData.milestoneEndDate,
              status: updatedData.status,
              remarks: updatedData.remarks,
            })
          } else {
            this.updateSchedule.push({
              id: 0,
              proposalID: this.proposalID,
              milestoneID: updatedData.milestoneID,
              milestoneStartDate: updatedData.milestoneStartDate,
              milestoneEndDate: updatedData.milestoneEndDate,
              status: updatedData.status,
              remarks: updatedData.remarks,
            })
          }
        } else {
          //this.notificationService.showAlert("Please fill all required information.", "Alert !");
        }
      });

      if (this.isRequired) {
        this.notificationService.showAlert("Please fill all required information.", "Alert !");
      } else {
        this.saveScheduleData(this.updateSchedule);
      }
    }
  }

  saveScheduleData(data: ScheduleModel[]) {
    this.proposalService.saveScheduleDetails(data).subscribe((response: any) => {
      if (response && response === true) {
        this.notificationService.showSuccess('Schedule details saved', 'Success !');
        this.getScheduleData();
      } else {
        this.notificationService.showError('Schedule details save failed', 'Error !');
      }
    }, error => {
        this.notificationService.showError('Schedule details save failed', 'Error !');
    });
  }

  delete() {
    const count = this.gridOptionsSchedule.api.getSelectedNodes().length;
    if (count > 0) {
      const dialogRef = this.dialogService.openConfirmationDialog('Are you sure, you want to delete all the selected records ?');

      dialogRef.afterClosed().subscribe(data => {
        if (data === true) {
          this.gridOptionsSchedule.api.getSelectedNodes().forEach((element, index) => {
            if (+element.data.id < 0) {
              this.notificationService.showSuccess('Schedule details deleted', 'Success !');
            } else {
              this.deleteSchedule(+element.data.id);
            }
            if (index === count - 1) {
              this.getScheduleData();
            }
          });
        } else {

        }
      })
    } else {
      this.notificationService.showAlert('Please select atleast one record to delete', 'Alert !');
    }
  }

  deleteRow(e) {
    if (+e.rowData.id < 0) {
      const deleterow = [e.rowData]
      this.updateScheduleIds = this.updateScheduleIds.filter(x => x !== +e.rowData.id);
      this.gridOptionsSchedule.api.updateRowData({ remove: deleterow });
      this.notificationService.showSuccess('Schedule details deleted', 'Success !');
    } else {
      this.updateScheduleIds = this.updateScheduleIds.filter(x => x !== +e.rowData.id);
      this.deleteSchedule(+e.rowData.id);
    }
  }

  deleteSchedule(Id: any) {
    this.proposalService.deleteScheduleDetails(Id)
      .subscribe(response => {
        if (response && response === true) {
          this.notificationService.showSuccess('Schedule details deleted', 'Success !');
          const deleterow = [this.gridOptionsSchedule.api.getRowNode(Id.toString())];
          this.gridOptionsSchedule.api.updateRowData({ remove: deleterow });
        } else {
          this.notificationService.showError('Schedule details delete failed', 'Error !');
        }
      },
        error => {
          this.notificationService.showError('Schedule details delete failed', 'Error !');
        });
  }

  

}
