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

export class ProposalDocuments {
  documentId: number;
  documentName: string;
  documentStream: string;
}
