import { NativeDateAdapter } from "@angular/material";


export class MyDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat == "DD-MMM-YYYY") {
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      return this._to2digit(day) + '-' + monthNames[month] + '-' + year;
    } else {
        return date.toDateString();
    }
  }


  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
