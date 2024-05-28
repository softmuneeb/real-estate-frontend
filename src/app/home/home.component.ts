
import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housinglocation';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, MatProgressSpinnerModule],
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.css',
})
export class HomeComponent {
  housingLocationList: HousingLocation[];
  filteredLocationList: HousingLocation[];

  housingService: HousingService = inject(HousingService);

  constructor() {
    // TODO ADD SPINNER
    this.housingLocationList = [];  
    this.filteredLocationList = [];
    this.setHousingLocation();
  }

  setHousingLocation = async () => {
    this.housingLocationList =
      await this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  };

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city?.toLowerCase()?.includes(text?.toLowerCase()),
    );
  }
}
