import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { AlertService } from 'src/app/services/alert.service';
import { Contact } from 'src/app/models/contact.model';
import $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public contacts: any[];
  public newContactName = '';
  public newContactPhone = '';
  public loading = false;
  public showNewContactPanel = false;
  public newPhone = '';

  constructor(
    private contactService: ContactService,
    private alertService: AlertService
  ) { 
  }

  removeContactFromList(contact: Contact){
    this.contacts = this.contacts.filter(c => c._id != contact._id);
  }

  ngOnInit(): void {

    this.contactService.getContacts()
    .subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    }, (err) => {
      this.alertService.error('Error', 'Error getting contacts');
      console.log(err);
    });

  }

  validateNewContact(){
    if(this.newContactName.length < 3){
      this.alertService.toast('Contact name too short', 'warning');
      return;
    }
    if(this.newContactPhone == ''){
      this.alertService.toast('Invalid phone number', 'warning');
      return;
    }
    this.createContact();
  }

  hideNewContactPanel(): void{
    $('#open-new-contact-panel').trigger('click');
  }

  createContact(){
    this.loading = true;
    this.contactService.createContact(this.newContactName, this.newContactPhone)
    .subscribe((resp: any) => {
      if(resp.ok){
        this.alertService.toast('Contact created!', 'success');
        this.contacts.push( new Contact(resp.data) );
        
        this.newContactName = '';
        this.newContactPhone = '';

        this.hideNewContactPanel();

      }else{
        this.alertService.error('Error', resp.message);
      }
      this.loading = false;
    }, (err) => {
      this.alertService.error('Error', 'Error on update');
      console.log(err);
      this.loading = false;
    });
  }

}
