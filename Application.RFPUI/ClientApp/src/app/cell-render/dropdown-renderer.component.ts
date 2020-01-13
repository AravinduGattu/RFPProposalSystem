import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';

import {ICellEditorAngularComp} from 'ag-grid-angular';

@Component({
    selector: 'app-editor-cell',
    template: `
    <div #container style="height: 100%">
    <select class="ag-cell-edit-input" (change)="Clog($event.target.value)" [(ngModel)]="active" >
                     <option *ngFor="let x of dropdownvalues" [value]="x" >{{params.dropdownvalues[x]}}</option>
    </select>
    </div>
    `,
    styles: [`

    `]
})
export class DropdownEditorComponent implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public dropdownvalues: any;

  @ViewChild('container', { read: ViewContainerRef, static: true }) public container;
    public active: string;

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit() {
        setTimeout(() => {
            this.container.element.nativeElement.focus();
        });
    }

    agInit(params: any): void {
        this.params = params;
        console.log(this.params);
      this.dropdownvalues = Object.keys(params.dropdownvalues);
        this.setActive(params.value);
    }

    getValue(): any {
        return this.active ;
    }

    isPopup(): boolean {
        return false;
    }

    setActive(active: string): void {
        this.active = active;
    }



    Clog(value) {
      console.log(value);
      this.setActive(value);
    }
}
