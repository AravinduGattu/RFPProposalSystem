import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-date-cell',
  template: `<div><input type="date">
          </div>`
  //template: `<div><input [matDatepicker]="Picker">
  //        <mat-datepicker-toggle matSuffix [for]="Picker"></mat-datepicker-toggle>
  //        <mat-datepicker #Picker></mat-datepicker></div>`
})
export class DateRendererComponent implements ICellRendererAngularComp {
  public params: any;

    agInit(params: any): void {
      this.params = params;
    }

    refresh(): boolean {
        return false;
    }
}
