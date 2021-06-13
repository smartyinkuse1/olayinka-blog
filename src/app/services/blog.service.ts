import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogService {  

  constructor(private firestore: AngularFirestore) { }

  addBlog(value: Object) {
    const date  = Date.now()
    value["date"] = date
    console.log(value, "Service values after date is being added")
    return this.firestore.collection("blogs").add(value)
  }
}
