export class ProposalRequestModel {
  id: number;
  requestType: string;
  rfpCode: string;
  opportunityName: string;
  releaseDate: Date;
  practiceID: number;
  practiceName: string;
  practiceLead: string;
  customer: string;
  locationID: number;
  locationName: string;
  scope: string;
  description: string;
  submittedBy: number;
  submittedByName: string;
  createdDate: Date;
  createdBy: number;
  modifiedDate: Date;
  rfpSubmissionDate: Date;
  poc: string;
  additionalRemarks: string;
  proposalStatus: number;
  ProposalStatusName: string;
}

export class PricingModel {
  id: number;
  proposalID: number;
  role: number;
  description: string;
  count: number;
  allocation: number;
  locationID: number;
  totalHours: any;
  totalCost: any;
}

export class QuestionnaireModel {
  id: number;
  proposalID: number;
  area: string;
  question: string;
  answer: string;
  remarks: string;
}

export class QueFormModel {
  area: string;
  questions: QFormModel[];
}

export class QFormModel {
  id: number;
  proposalID: number;
  question: string;
  answer: string;
  response: string;
  remarks: string;
}

export class ScheduleModel {
  id: number;
  milestoneID: number;
  proposalID: number;
  milestoneStartDate: Date;
  milestoneEndDate: Date;
  status: number;
  remarks: string;
}

export class ProposalDocuments {
  documentId: number;
  documentName: string;
  documentStream: string;
}
