import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SupportService implements OnInit {

  constructor(private firestore: AngularFirestore) { }
  ngOnInit() {

  }
  setSupport(data){
    return new Promise<any>((resolve, reject) =>{
       this.firestore.collection("supports").add(data).then(res => {}, err => reject(err));
   });
  }
  getSupports() {
   return this.firestore.collection("supports").snapshotChanges();
 }
}
