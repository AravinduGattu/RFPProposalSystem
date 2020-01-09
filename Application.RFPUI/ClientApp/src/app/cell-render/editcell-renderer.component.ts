import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';

import {ICellEditorAngularComp} from 'ag-grid-angular';

@Component({
    selector: 'editor-cell',
    template: `
    <div class='ag-cell-edit-input' #container>
    <input #textinput [attr.type]="params.inputtype" class='ag-cell-edit-input'
     [attr.maxlength]="params.maxlength" [attr.size]="params.maxlength">
    </div>
    `,
    styles: [`

    `]
})
export class EditCellRenderComponent implements ICellEditorAngularComp, AfterViewInit {
    public params: any;

  @ViewChild('container', { read: ViewContainerRef, static: true}) public container;
  @ViewChild('textinput', { read: ViewContainerRef, static: true}) public textinput;
    public active: string;

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit() {
        setTimeout(() => {
            this.container.element.nativeElement.focus();
        });
    }

    agInit(params: any): void {
        this.params = params;
        this.textinput.element.nativeElement.value = params.value;
    }

    getValue(): any {
      return this.textinput.element.nativeElement.value;
    }

    isPopup(): boolean {
        return false;
    }

}
