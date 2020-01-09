import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';

@Injectable()

export class ProposalService {

  constructor(private httpService: HttpService) { }

  public getProposals(): Observable<any> {
    return this.httpService.makeGetRequest('Proposals/GetGrid');
  }

  public getProposalDetails(ID: any): Observable<any> {
    return this.httpService.makeGetRequest('Proposals/GetList?ProposalId=' + ID);
  }

  public addProposal(proposalData: any): Observable<any> {
    return this.httpService.makePostRequest('Proposals/Save', proposalData);
  }

  //Pricing//
  public getPricingDetails(ID: any): Observable<any> {
    return this.httpService.makeGetRequest('Pricing/GetList?ProposalId=' + ID);
  }

  public savePricingDetails(data: any): Observable<any> {
    return this.httpService.makePostRequest('Pricing/SaveList', data);
  }

  public deletePricingDetails(id: any): Observable<any> {
    return this.httpService.makeGetRequest('Pricing/Delete?id=' + id);
  }
}
