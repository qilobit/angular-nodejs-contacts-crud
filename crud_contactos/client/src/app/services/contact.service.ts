import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact.model';
import { Phone } from '../models/phone.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  //=====================
  /// Contact related methods
  getContacts(){
    return this.http.get(`${ environment.apiUrl }/contact`)
    .pipe(
      map((resp: any) => {
        return Array.from(resp.data).map(obj => new Contact(obj))
      })
    );
  }

  updateContact(id: string, name: string){
    return this.http.put(`${ environment.apiUrl }/contact/${ id }`, { name: name });
  }

  createContact(name: string, phone: string){
    return this.http.post(`${ environment.apiUrl }/contact`, { name: name, phone: phone });
  }

  deleteContact(id: string){
    return this.http.delete(`${ environment.apiUrl }/contact/${ id }`);
  }

  //=====================
  /// Phone related methods
  getPhonesByContact(contactId: string){
    return this.http.get(`${ environment.apiUrl }/phone/by-contact/${ contactId }`)
    .pipe(
      map((resp: any) => {
        return Array.from(resp.data).map(obj => new Phone(obj))
      })
    );
  }

  addPhoneToContact(contactId: string, phone: string){
    return this.http.post(`${ environment.apiUrl }/phone`, { 
      phone: phone,
      contact_id:  contactId
    });
  }

  updatePhone(phoneNewValue: string, phoneId: string){
    return this.http.put(`${ environment.apiUrl }/phone/${ phoneId }`, { 
      newPhone: phoneNewValue 
    });
  }

  deletePhoneFromContact(phoneId: string){
    console.log(`deletePhoneFromContact ${phoneId}`);
    return this.http.delete(`${ environment.apiUrl }/phone/${ phoneId }`);
  }

}
