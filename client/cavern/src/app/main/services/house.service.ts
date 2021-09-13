import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { House } from '../models/house';
import { Investor } from '../models/investor';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private houseBaseUrl: string = 'http://localhost:8002/api/houses';

  constructor(private http: HttpClient) { }

  getAllHouses(): Observable<House> {
    return this.http.get<House>(this.houseBaseUrl);
  }

  getHouseById(id: number): Observable<House> {
    return this.http.get<House>(this.houseBaseUrl + '/' + id);
  }

  createHouse(house: House) {
    this.http.post<House>(this.houseBaseUrl, house);
  }

  editHouse(house: House) {
    this.http.put<House>(this.houseBaseUrl, house);
  }

  deleteHouse(id: number) {
    this.http.delete<House>(this.houseBaseUrl + '/' + id);
  }

  addInvestor(houseId: number, investor: Investor) {
    this.http.post<House>(this.houseBaseUrl + '/' + houseId + '/investors', investor);
  }

  editInvestor(houseId: number, investor: Investor) {
    this.http.put<House>(this.houseBaseUrl + '/' + houseId + '/investors', investor);
  }

  deleteInvestor(houseId: number, investorId: number) {
    this.http.delete<House>(this.houseBaseUrl + '/' + houseId + '/investors/' + investorId);
  }
}
