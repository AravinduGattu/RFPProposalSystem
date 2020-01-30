import { Component, ViewChild, ViewContainerRef} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-date-cell',
  template: `<div #container style="height: 100%">
        <input type="date" [(ngModel)]="selectedDate" (change)="getSelectedDate(this)">
          </div>`
  //template: `<div><input [matDatepicker]="Picker">
  //        <mat-datepicker-toggle matSuffix [for]="Picker"></mat-datepicker-toggle>
  //        <mat-datepicker #Picker></mat-datepicker></div>`
})
export class DateRendererComponent implements ICellRendererAngularComp {
  public params: any;

  @ViewChild('container', { read: ViewContainerRef, static: true }) public container;
  public selectedDate: string;

    agInit(params: any): void {
      this.params = params;
      this.setActive(params.value);
  }

  getValue(): any {
    return this.selectedDate;
  }

    refresh(): boolean {
        return false;
  }

  setActive(date: string): void {
    this.selectedDate = date;
  }

  getSelectedDate(x: any): void {
    this.setActive(x.selectedDate);
  }
}
