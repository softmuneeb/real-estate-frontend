import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Does this location have laundry: {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="name" />
          @if (name?.invalid && (name?.dirty || name?.touched)) {
            <div
              class="alert alert-danger"
              >
              @if (name?.hasError('required')) {
                <div>Name is required.</div>
              }
              @if (name?.hasError('minlength')) {
                <div>
                  Name must be at least 4 characters long.
                </div>
              }
            </div>
          }
    
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
    `,
  styleUrls: ['details.component.css'],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.minLength(4),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get name() {
    return this.applyForm.get('name');
  }
  get skill() {
    return this.applyForm.get('skill');
  }

  constructor() {
    this.setHousingLocation();
  }

  setHousingLocation = async () => {
    const id = Number(this.route.snapshot.params['id']);
    this.housingLocation = await this.housingService.getHousingLocationById(id);
  };

  submitApplication() {
    // Check if the form is invalid
    if (this.applyForm.invalid) {
      // Mark all controls as touched to trigger validation messages
      this.applyForm.markAllAsTouched();
      console.log('Erros Form submitted');
      return;
    }

    // Proceed with form submission
    console.log('Form submitted', this.applyForm.value);

    this.housingService.submitApplication(
      this.applyForm.value.name || '',
      this.applyForm.value.email || '',
    );
  }
}
