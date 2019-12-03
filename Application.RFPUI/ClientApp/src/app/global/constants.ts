export const Roles = {
  1: 'Sales Lead',
  2: 'Practice Lead',
  3: 'Pursuit Lead',
  4: 'Delivery Lead'
}

export const RequestTypes = [
  {
    requestTypeId: 1,
    requestTypeName: 'Project'
  },
  {
    requestTypeId: 2,
    requestTypeName: 'Resource'
  }
]

export const Streams = [
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
]


//Sample Data
export const RFPSampleData =
  {
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
        "milestone": "Q & A",
        "scheduleStartDate": "2019-10-18T18:30:00.000Z",
        "scheduleEndDate": "2019-10-20T18:30:00.000Z",
        "remarks": "Q&A conversation"
      },
      {
        "milestone": "Proposal Submit",
        "scheduleStartDate": "2019-10-21T18:30:00.000Z",
        "scheduleEndDate": "2019-10-23T18:30:00.000Z",
        "remarks": "Complete Proposal submit"
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
  }
;


