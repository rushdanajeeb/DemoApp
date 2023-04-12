import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';
import { EditPlaceResolver } from './edit-place/edit-place.resolver';
import { DateSortComponent } from './date-sort/date-sort.component';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'date-sort', component: DateSortComponent },
  { path: 'add-place', component: AddPlaceComponent },
  { path: 'details/:id', component: EditPlaceComponent, resolve: { data: EditPlaceResolver } }
];
