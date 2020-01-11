"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = {
    1: 'Sales Lead',
    2: 'Practice Lead',
    3: 'Pursuit Lead',
    4: 'Delivery Lead'
};
exports.RequestTypes = [
    {
        requestTypeId: 1,
        requestTypeName: 'Project'
    },
    {
        requestTypeId: 2,
        requestTypeName: 'Resource'
    }
];
exports.Streams = [
    {
        streamId: 1,
        streamName: 'Engineering'
    },
    {
        streamId: 2,
        streamName: 'Digitalization'
    },
    {
        streamId: 3,
        streamName: 'Globalization'
    },
    {
        streamId: 4,
        streamName: 'Emerging Tech'
    }
];
exports.TaskStatus = [
    {
        statusId: 1,
        status: 'Yet to start'
    },
    {
        statusId: 2,
        status: 'In Progress'
    },
    {
        statusId: 3,
        status: 'Completed'
    },
    {
        statusId: 4,
        status: 'Review'
    }
];
exports.MY_DATE_FORMATS = {
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
    },
    display: {
        // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};
exports.Months = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
};
exports.appConstants = {
    dateFormat: 'dd-MMM-yyyy'
};
exports.MileStones = [
    {
        mileStoneId: 1,
        mileStoneName: 'Q&A Session with vendors'
    },
    {
        mileStoneId: 2,
        mileStoneName: 'Proposal Submission'
    },
    {
        mileStoneId: 3,
        mileStoneName: 'Proposal review and clarification'
    },
    {
        mileStoneId: 4,
        mileStoneName: 'Oral explanation Proposal by preselected vendors at ISEAMX office'
    },
    {
        mileStoneId: 5,
        mileStoneName: 'Reference calls or visits'
    },
    {
        mileStoneId: 6,
        mileStoneName: 'Final Submission'
    },
    {
        mileStoneId: 7,
        mileStoneName: 'Vendor evaluation exercise'
    },
    {
        mileStoneId: 8,
        mileStoneName: 'Award the project'
    },
    {
        mileStoneId: 9,
        mileStoneName: 'Project start date'
    }
];
//Sample Data
exports.RFPSampleData = {
    "RFPUser": null,
    "rfpCode": 'PCT001IKEA',
    "practiceType": 'Engineering',
    "practiceLead": 'Practice Lead 2',
    "status": "Submitted",
    "requestType": "Project",
    "customer": "Microsoft",
    "location": "Singapore",
    "requestedDate": "2019-10-18T18:30:00.000Z",
    "title": "Microsoft CSS Coach Bot",
    "scope": "AI and Machine Learning",
    "description": "Customer Service Support application",
    "additionalInformation": "Additional Information",
    "schedule": [
        {
            "scheduleID": 1,
            "status": "Yes",
            "milestone": 1,
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
    ],
    "questionnaire": [
        {
            "questionnaireArea": "Basic",
            "questions": [
                {
                    "question": "Is the current data on-premise? Is each data centre for each country or each store?",
                    "answer": "There is on-premise (eg. NAV), each store. There is also on cloud (eg. CRM)"
                },
                {
                    "question": "Is the current data stored in a centralized repository? If so, what is the repository?",
                    "answer": "Current data for BI tool consumption stored in QVD + SQL DWH server – non processing of personal data "
                }
            ]
        },
        {
            "questionnaireArea": "Main",
            "questions": [
                {
                    "question": "Does ISEAMX have a cloud- first strategy? If yes, what cloud does ISEAMX prefer?",
                    "answer": "Strategy not yet defined, open for proposal. Take into consideration of data residency and data sovereignty legislation of all operating countries: Singapore, Malaysia, Thailand, Philippines, Mexico "
                }
            ]
        }
    ]
};
//# sourceMappingURL=constants.js.map