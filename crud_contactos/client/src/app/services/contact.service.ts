import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

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

  addPhoneToContact(contactId: string, phone: string){
    return this.http.post(`${ environment.apiUrl }/contact/${ contactId }/add-phone`, { phone: phone });
  }

  updatePhone(contactId: string, phoneNewValue: string, phoneIndex: number){
    return this.http.put(`${ environment.apiUrl }/contact/${ contactId }/phone/${ phoneIndex }`, { newPhone: phoneNewValue });
  }

  deletePhoneFromContact(contactId: string, phone: string){
    return this.http.delete(`${ environment.apiUrl }/contact/${ contactId }/phone/${ phone }`);
  }

}
