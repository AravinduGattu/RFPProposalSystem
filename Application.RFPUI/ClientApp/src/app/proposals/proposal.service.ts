import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';

@Injectable()

export class ProposalService {

  constructor(private httpService: HttpService) { }

  public getProposals(): Observable<any> {
    return this.httpService.makeGetRequest('Proposals/GetGrid');
  }

  public getProposalDetails(RFPCode: any): Observable<any> {
    return this.httpService.makeGetRequest('GetProposals?requestID=' + RFPCode);
  }

  public addProposal(proposalData: any): Observable<any> {
    return this.httpService.makePostRequestforFormData('CreateProposal', proposalData);
  }
}
