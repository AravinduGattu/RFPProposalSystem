import { NativeDateAdapter } from "@angular/material";
import { Months } from '../global/constants';

export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
       if (displayFormat == "input") {
           let day = date.getDate();
           let month = date.getMonth() + 1;
           let year = date.getFullYear();
         return this._to2digit(day) + '-' + this._toShortMonth(month) + '-' + year;
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
