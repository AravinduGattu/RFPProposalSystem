"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepsForSL = [
    { dateLabel: '10 Oct, 2019 12:10', title: 'Proposal Started', acceptance: 'yes' },
    //{ dateLabel: '11 Oct, 2019 10:10', title: 'Rejected by PL', acceptance: 'no' },
    //{ dateLabel: 'Date', title: 'Resubmit', acceptance: 'pending' },
    { dateLabel: 'Date', title: 'Approved by Practice Lead', acceptance: 'pending' },
    { dateLabel: 'Date', title: 'Approved by Pursuit Lead', acceptance: 'pending' },
    { dateLabel: 'Date', title: 'Accepted by Delivery Lead', acceptance: 'pending' }
];
exports.stepsForPRL = [
    { dateLabel: '10 Oct, 2019 12:10', title: 'Proposal Started', acceptance: 'yes' },
    //{ dateLabel: '11 Oct, 2019 10:10', title: 'Rejected by PL', acceptance: 'no' },
    //{ dateLabel: '13 Oct, 2019 10:10', title: 'Resubmit', acceptance: 'yes' },
    { dateLabel: 'Date', title: 'Approved by Practice Lead', acceptance: 'pending' },
    { dateLabel: 'Date', title: 'Approved by Pursuit Lead', acceptance: 'pending' },
    { dateLabel: 'Date', title: 'Accepted by Delivery Lead', acceptance: 'pending' }
];
exports.stepsForPUL = [
    { dateLabel: '10 Oct, 2019 12:10', title: 'Proposal Started', acceptance: 'yes' },
    //{ dateLabel: '11 Oct, 2019 10:10', title: 'Rejected by PL', acceptance: 'no' },
    //{ dateLabel: '13 Oct, 2019 10:10', title: 'Resubmit', acceptance: 'yes' },
    { dateLabel: '15 Oct, 2019 3:10', title: 'Approved by Practice Lead', acceptance: 'yes' },
    { dateLabel: 'Date', title: 'Approved by Pursuit Lead', acceptance: 'pending' },
    { dateLabel: 'Date', title: 'Accepted by Delivery Lead', acceptance: 'pending' }
];
exports.stepsForDL = [
    { dateLabel: '10 Oct, 2019 12:10', title: 'Proposal Started', acceptance: 'yes' },
    //{ dateLabel: '11 Oct, 2019 10:10', title: 'Rejected by PL', acceptance: 'no' },
    //{ dateLabel: '13 Oct, 2019 10:10', title: 'Resubmit', acceptance: 'yes' },
    { dateLabel: '15 Oct, 2019 3:10', title: 'Approved by Practice Lead', acceptance: 'yes' },
    { dateLabel: '18 Oct, 2019 3:10', title: 'Approved by Pursuit Lead', acceptance: 'yes' },
    { dateLabel: 'Date', title: 'Accepted by Delivery Lead', acceptance: 'pending' }
];
exports.stepsForDLComplete = [
    { dateLabel: '10 Oct, 2019 12:10', title: 'Proposal Started', acceptance: 'yes' },
    //{ dateLabel: '11 Oct, 2019 10:10', title: 'Rejected by PL', acceptance: 'no' },
    //{ dateLabel: '13 Oct, 2019 10:10', title: 'Resubmit', acceptance: 'yes' },
    { dateLabel: '15 Oct, 2019 3:10', title: 'Approved by Practice Lead', acceptance: 'yes' },
    { dateLabel: '18 Oct, 2019 3:10', title: 'Approved by Pursuit Lead', acceptance: 'yes' },
    { dateLabel: 'Date', title: 'Accepted by Delivery Lead', acceptance: 'yes' }
];
exports.RFPMockupData = [
    {
        "id": 1,
        "requestType": "test",
        "rfpCode": "ABCD123",
        "opportunityName": "NewOpp",
        "releaseDate": "2020-10-10T00:00:00",
        "practiceID": 2,
        "practiceName": "Digitalization",
        "practiceLead": "Kota",
        "customer": "GE",
        "locationID": 1,
        "locationName": "INDIA",
        "scope": "Full",
        "description": "New client",
        "submittedBy": "2",
        "submittedByName": "Sreekanth",
        "createdBy": "2",
        "createdByName": "Sreekanth",
        "modifiedBy": "4",
        "modifiedByName": "Thomson",
        "createdDate": "2019-10-10T00:00:00",
        "modifiedDate": "2019-10-12T00:00:00",
        "rfpSubmissionDate": "2019-10-15T00:00:00",
        "poc": "John",
        "additionalRemarks": "NA",
        "proposalStatus": 1,
        "proposalStatusName": "Drafted"
    },
    {
        "id": 3,
        "requestType": "Live",
        "rfpCode": "GNVJH244SKMC",
        "opportunityName": "Opp Florida",
        "releaseDate": "2019-03-08T00:00:00",
        "practiceID": 3,
        "practiceName": "Globalization",
        "practiceLead": "Polo",
        "customer": "Pepsi",
        "locationID": 3,
        "locationName": "CANADA",
        "scope": "Grand",
        "description": "Hyatt",
        "submittedBy": "3",
        "submittedByName": "Sashi",
        "createdBy": "3",
        "createdByName": "Sashi",
        "modifiedBy": "5",
        "modifiedByName": "maruthi",
        "createdDate": "2019-07-04T00:00:00",
        "modifiedDate": "2019-03-04T00:00:00",
        "rfpSubmissionDate": "2019-02-09T00:00:00",
        "poc": "Chris",
        "additionalRemarks": "NA",
        "proposalStatus": 2,
        "proposalStatusName": "Draft_Reviewed"
    },
    {
        "id": 2,
        "requestType": "Live",
        "rfpCode": "CBF123GHD",
        "opportunityName": "Opp Canada",
        "releaseDate": "2019-02-05T00:00:00",
        "practiceID": 4,
        "practiceName": "EmergingTech",
        "practiceLead": "Gaya",
        "customer": "Colgate",
        "locationID": 2,
        "locationName": "Singapure",
        "scope": "Nill",
        "description": "Clitele",
        "submittedBy": "3",
        "submittedByName": "Sashi",
        "createdBy": "3",
        "createdByName": "Sashi",
        "modifiedBy": "5",
        "modifiedByName": "maruthi",
        "createdDate": "2019-04-10T00:00:00",
        "modifiedDate": "2019-10-04T00:00:00",
        "rfpSubmissionDate": "2019-10-09T00:00:00",
        "poc": "Van",
        "additionalRemarks": "NA",
        "proposalStatus": 2,
        "proposalStatusName": "Draft_Reviewed"
    },
    {
        "id": 3,
        "requestType": "Project",
        "rfpCode": "IKEA",
        "opportunityName": "Opp Canada",
        "releaseDate": "2019-02-05T00:00:00",
        "practiceID": 2,
        "practiceName": "Digitalization",
        "practiceLead": "Sreekanth",
        "customer": "Colgate",
        "locationID": 2,
        "locationName": "Singapure",
        "scope": "Nill",
        "description": "Clitele",
        "submittedBy": "3",
        "submittedByName": "Sashi",
        "createdBy": "3",
        "createdByName": "Sashi",
        "modifiedBy": "5",
        "modifiedByName": "maruthi",
        "createdDate": "2019-04-10T00:00:00",
        "modifiedDate": "2019-10-04T00:00:00",
        "rfpSubmissionDate": "2019-10-09T00:00:00",
        "poc": "Van",
        "additionalRemarks": "NA",
        "proposalStatus": 2,
        "proposalStatusName": "Draft_Reviewed"
    }
];
exports.scheduleDetails = [
    {
        "scheduleID": 1,
        "status": "Yes",
        "milestone": "1",
        "scheduleStartDate": "2019-10-18T18:30:00.000Z",
        "scheduleEndDate": "2019-10-20T18:30:00.000Z",
        "remarks": "Q&A conversation"
    },
    {
        "scheduleID": 2,
        "status": "Yes",
        "milestone": "2",
        "scheduleStartDate": "2019-10-21T18:30:00.000Z",
        "scheduleEndDate": "2019-10-23T18:30:00.000Z",
        "remarks": "Before 17:00 hrs"
    },
    {
        "scheduleID": 3,
        "status": "Yes",
        "milestone": "3",
        "scheduleStartDate": "2019-10-21T18:30:00.000Z",
        "scheduleEndDate": "2019-10-23T18:30:00.000Z",
        "remarks": "Face to face session"
    },
    {
        "scheduleID": 3,
        "status": "Inprogress",
        "milestone": "5",
        "scheduleStartDate": "2019-10-21T18:30:00.000Z",
        "scheduleEndDate": "2019-10-23T18:30:00.000Z",
        "remarks": "Face to face session"
    },
    {
        "scheduleID": 4,
        "status": "No",
        "milestone": "6",
        "scheduleStartDate": "2019-10-21T18:30:00.000Z",
        "scheduleEndDate": "2019-10-23T18:30:00.000Z",
        "remarks": "Vendors submit final proposal based on feedback from the calls"
    }
];
//# sourceMappingURL=MockupConstants.js.map