import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { House } from '../models/house';
import { Investor } from '../models/investor';


@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private houseBaseUrl: string = 'http://localhost:8082/api/houses';
  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(private http: HttpClient) { }

  getAllHouses(): Observable<House> {
    return this.http.get<House>(this.houseBaseUrl);
  }

  getHouseById(id: number): Observable<House> {
    return this.http.get<House>(`${this.houseBaseUrl}/${id}`);
  }

  createHouse(house: House): Observable<House> {
    return this.http.post<House>(this.houseBaseUrl, house, this.jsonContentTypeHeaders);
  }

  editHouse(house: House): Observable<House> {
    return this.http.put<House>(this.houseBaseUrl, house, this.jsonContentTypeHeaders);
  }

  deleteHouse(id: number): Observable<House> {
    return this.http.delete<House>(`${this.houseBaseUrl}/${id}`);
  }

  addInvestor(houseId: number, investor: Investor): Observable<House> {
    return this.http.post<House>(`${this.houseBaseUrl}/${houseId}/investors`, investor, this.jsonContentTypeHeaders);
  }

  editInvestor(houseId: number, investor: Investor): Observable<House> {
    return this.http.put<House>(`${this.houseBaseUrl}/${houseId}/investors`, investor, this.jsonContentTypeHeaders);
  }

  deleteInvestor(houseId: number, investorId: number): Observable<House> {
    return this.http.delete<House>(`${this.houseBaseUrl}/${houseId}/investors/${investorId}`);
  }
}
