import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public setSession(name: string, value: string) {
    sessionStorage.setItem(name, value);
  }

  public getSession(name: string) {
    return sessionStorage.getItem(name);
  }

  public clear() {
    sessionStorage.clear();
  }
}
