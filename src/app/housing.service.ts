import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor() {}

  // json-server --watch db.json
  url = 'http://localhost:3000/locations';

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const res = await fetch(this.url);
    return (await res.json()) || [];
  }

  async getHousingLocationById(
    id: number,
  ): Promise<HousingLocation | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    return (await res.json()) || {};
  }

  submitApplication(firstName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, email: ${email}.`,
    );
  }
}
