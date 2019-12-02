"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProposalUsers;
(function (ProposalUsers) {
    ProposalUsers[ProposalUsers["All"] = 0] = "All";
    ProposalUsers[ProposalUsers["SalesLead"] = 1] = "SalesLead";
    ProposalUsers[ProposalUsers["PracticeLead"] = 2] = "PracticeLead";
    ProposalUsers[ProposalUsers["PursuitTeamLead"] = 3] = "PursuitTeamLead";
    ProposalUsers[ProposalUsers["DeliveryTeamLead"] = 4] = "DeliveryTeamLead";
})(ProposalUsers = exports.ProposalUsers || (exports.ProposalUsers = {}));
var Stream;
(function (Stream) {
    Stream[Stream["Engineering"] = 1] = "Engineering";
    Stream[Stream["Digitalization"] = 2] = "Digitalization";
    Stream[Stream["Globalization"] = 3] = "Globalization";
    Stream[Stream["EmergingTech"] = 4] = "EmergingTech";
})(Stream = exports.Stream || (exports.Stream = {}));
var ProposalRequestType;
(function (ProposalRequestType) {
    ProposalRequestType[ProposalRequestType["Drafted"] = 1] = "Drafted";
    //PRLApprove
    ProposalRequestType[ProposalRequestType["Draft_Reviewed"] = 2] = "Draft_Reviewed";
    //PRLReject
    ProposalRequestType[ProposalRequestType["Draft_Rejected"] = 3] = "Draft_Rejected";
    ProposalRequestType[ProposalRequestType["Draft_Resubmit"] = 4] = "Draft_Resubmit";
    //PULApprove
    ProposalRequestType[ProposalRequestType["Solution_Created"] = 5] = "Solution_Created";
    //PRLApprove
    ProposalRequestType[ProposalRequestType["Solution_Reviwed"] = 6] = "Solution_Reviwed";
    //PRLApprove
    ProposalRequestType[ProposalRequestType["Pricing_Created"] = 7] = "Pricing_Created";
    //PRLReject
    ProposalRequestType[ProposalRequestType["Solution_Rejected"] = 8] = "Solution_Rejected";
    //PRLReject
    ProposalRequestType[ProposalRequestType["Solution_Resubmit"] = 9] = "Solution_Resubmit";
    //SL
    ProposalRequestType[ProposalRequestType["Presentation_Submited"] = 10] = "Presentation_Submited";
    //PRL 
    ProposalRequestType[ProposalRequestType["Assigned_To_Delivery_Team"] = 11] = "Assigned_To_Delivery_Team";
    //DL
    ProposalRequestType[ProposalRequestType["Accept"] = 12] = "Accept";
})(ProposalRequestType = exports.ProposalRequestType || (exports.ProposalRequestType = {}));
//# sourceMappingURL=enum.js.map