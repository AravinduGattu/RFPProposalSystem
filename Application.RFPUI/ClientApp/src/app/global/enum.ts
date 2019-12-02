export enum ProposalUsers {
  All = 0,
  SalesLead = 1,
  PracticeLead = 2,
  PursuitTeamLead = 3,
  DeliveryTeamLead = 4
}

export enum Stream {
  Engineering = 1,
  Digitalization = 2,
  Globalization = 3,
  EmergingTech = 4
}

export enum Session {
  token = 'token',
  userId = 'userId',
  userName = 'userName',
  userEmail = 'userEmail',
  userRole = 'userRole',
}

export enum ProposalRequestType {
  Drafted = 1,
  //PRLApprove
  Draft_Reviewed = 2,
  //PRLReject
  Draft_Rejected = 3,
  Draft_Resubmit = 4,
  //PULApprove
  Solution_Created = 5,
  //PRLApprove
  Solution_Reviwed = 6,
  //PRLApprove
  Pricing_Created = 7,
  //PRLReject
  Solution_Rejected = 8,
  //PRLReject
  Solution_Resubmit = 9,
  //SL
  Presentation_Submited = 10,
  //PRL 
  Assigned_To_Delivery_Team = 11,
  //DL
  Accept = 12
}
