import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  get(userKey) {
    return this.db.collection('visited-places').doc(userKey).snapshotChanges();
  }

  update(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('visited-places').doc(userKey).set(value);
  }

  delete(userKey) {
    return this.db.collection('visited-places').doc(userKey).delete();
  }

  list() {
    return this.db.collection('visited-places').snapshotChanges();
  }

  sortByDate() {
    return this.db.collection('visited-places',
      ref =>
        ref
          .orderBy("visitDate", 'desc')).snapshotChanges();
  }

  add(value) {
    return this.db.collection('visited-places').add({
      name: value.name,
      visitDate: value.visitDate,
      experience: value.experience,
      rating: value.rating,
    });
  }
}
