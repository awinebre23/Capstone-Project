import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from '../models/organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private orgUrl: string = 'http://localhost:8082/api/organizations';

  constructor(private http: HttpClient) { }

  getAllOrganizations(): Observable<Organization> {
    return this.http.get<Organization>(this.orgUrl);
  }
}
