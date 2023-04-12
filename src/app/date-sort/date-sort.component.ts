import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-date-sort',
  templateUrl: './date-sort.component.html',
  styleUrls: ['./date-sort.component.css']
})
export class DateSortComponent implements OnInit {

  ratingValue: number = 0;
  items: Array<any>;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.sortByDate()
      .subscribe(result => {
        this.items = result;
      })
  }

  viewDetails(item) {
    this.router.navigate(['/details/' + item.payload.doc.id]);
  }

  delete(item) {
    this.firebaseService.delete(item.payload.doc.id)
      .then(
        res => {
          this.router.navigate(['/home']);
        },
        err => {
          console.log(err);
        }
      )
  }

}
