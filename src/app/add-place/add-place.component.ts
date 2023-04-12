import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent implements OnInit {

  exampleForm: FormGroup;

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
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required],
      visitDate: ['', Validators.required],
      experience: ['', Validators.required],
      rating: ['', Validators.required],
    });
  }

  resetFields() {
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      visitDate: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
    });
  }

  onSubmit(value) {
    this.firebaseService.add(value)
      .then(
        res => {
          this.resetFields();
          this.router.navigate(['/home']);
        }
      )
  }

}
