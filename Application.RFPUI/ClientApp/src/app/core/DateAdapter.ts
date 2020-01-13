import { NativeDateAdapter } from "@angular/material";
import { Months, appConstants } from '../global/constants';
import { DatePipe } from '@angular/common';

export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
       if (displayFormat == "input") {
           //let day = date.getDate();
           //let month = date.getMonth() + 1;
           //let year = date.getFullYear();
        // return this._to2digit(day) + '-' + this._toShortMonth(month) + '-' + year;
         var datePipe = new DatePipe(appConstants.locale);
         return datePipe.transform(date, appConstants.dateFormat);
       } else {
           return date.toDateString();
       }
   }

   private _to2digit(n: number) {
       return ('00' + n).slice(-2);
  }

  private _toShortMonth(n: number) {
    return Months[n];
  }
}
