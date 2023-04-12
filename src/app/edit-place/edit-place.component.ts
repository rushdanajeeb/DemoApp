import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Destination Name is required.' }
    ],
    'visitDate': [
      { type: 'required', message: 'Date visited is required.' }
    ],
    'experience': [
      { type: 'required', message: 'Experience is required.' }
    ],
    'rating': [
      { type: 'required', message: 'rating is required.' },
      { range: 5, message: 'The rating should only be 1-5' }
    ],
  };

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required],
      visitDate: [this.item.visitDate, Validators.required],
      experience: [this.item.experience, Validators.required],
      rating: [this.item.rating, Validators.required],
    });
  }

  onSubmit(value) {
    value.rating = Number(value.rating);
    this.firebaseService.update(this.item.id, value)
      .then(
        res => {
          this.router.navigate(['/home']);
        }
      )
  }


  cancel() {
    this.router.navigate(['/home']);
  }

}
