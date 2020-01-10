"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = require("@angular/material");
var MyDateAdapter = /** @class */ (function (_super) {
    __extends(MyDateAdapter, _super);
    function MyDateAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyDateAdapter.prototype.format = function (date, displayFormat) {
        if (displayFormat == "DD-MMM-YYYY") {
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            return this._to2digit(day) + '-' + monthNames[month] + '-' + year;
        }
        else {
            return date.toDateString();
        }
    };
    MyDateAdapter.prototype._to2digit = function (n) {
        return ('00' + n).slice(-2);
    };
    return MyDateAdapter;
}(material_1.NativeDateAdapter));
exports.MyDateAdapter = MyDateAdapter;
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
//# sourceMappingURL=myDateAdapter.js.map