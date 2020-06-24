import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { AlertService } from 'src/app/services/alert.service';
import $ from 'jquery';
import { Phone } from 'src/app/models/phone.model';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styles: [
  ]
})
export class ContactCardComponent implements OnInit {

  @Input() contact: Contact;
  @Output() deletedContact: EventEmitter<Contact> = new EventEmitter();
  public loading = false;
  public showNewContactPanel = false;
  public newPhone = '';

  constructor(
    private contactService: ContactService,
    private alertService: AlertService
  ) { 
    
  }

  ngOnInit(): void {
    this.contactService
    .getPhonesByContact(this.contact._id)
    .subscribe((phones: Phone[]) => {
      this.contact.phones = phones;
    }, (err) => {
      this.alertService.error('Error', 'Error getting phones');
      console.log(err);
      this.contact.loading = false;
    });
  }

  updateContact(contact: Contact){
    contact.loading = true;
    this.contactService.updateContact(contact._id, contact.name)
    .subscribe((resp: any) => {
      if(resp.ok){
        this.alertService.toast('Contact updated!', 'success');
        contact.editing = false;
      }else{
        this.alertService.error('Error', resp.message);
      }
      contact.loading = false;
    }, (err) => {
      this.alertService.error('Error', 'Error on update');
      console.log(err);
      contact.loading = false;
    });
  }

  async deleteContact(){
    const resp: any = await this.alertService.confirm('This contact will be destroy');
    if(resp.value){
      this.contactService.deleteContact(this.contact._id)
      .subscribe((resp: any) => {
        if(resp.ok){
          this.alertService.toast('Contact deleted!', 'success');
          this.deletedContact.emit( this.contact );
        }else{
          this.alertService.error('Error', resp.message);
        }
        this.contact.loading = false;
      }, (err) => {
        this.alertService.error('Error', 'Error on delete');
        console.log(err);
        this.contact.loading = false;
      });
    }
  }

  hideNewPhonePanel(contactId: string): void{
    $(`#open-new-phone-panel-${ contactId }`).trigger('click');
  }

  addPhoneToContact(contact: Contact){
    if(this.newPhone == ''){
      this.alertService.toast('Invalid phone number', 'warning');
      return;
    }

    this.contactService.addPhoneToContact(contact._id, this.newPhone)
    .subscribe((resp: any) => {
      if(resp.ok){
        this.alertService.toast('Phone added to contact!', 'success');
        
        contact.phones.push( new Phone( resp.data ) );
        this.newPhone = '';

        this.hideNewPhonePanel( contact._id );

      }else{
        this.alertService.error('Error', resp.message);
      }
      this.loading = false;
    }, (err) => {
      this.alertService.error('Error', 'Error adding phone to contact');
      console.log(err);
      this.loading = false;
    });
    
  }

  updateContactPhone(phone: Phone){
    phone.editing = true;
    this.contactService.updatePhone(phone.phone_number, phone._id)
    .subscribe((resp: any) => {
      if(resp.ok){
        this.alertService.toast('Phone updated!', 'success');        
      }else{
        this.alertService.error('Error', resp.message);
      }
      phone.editing = false;
    }, (err) => {
      this.alertService.error('Error', 'Error updating phone');
      console.log(err);
      phone.editing = false;
    });
  }

  async deleteContactPhone(phone: Phone){
    this.contact.loading = true;
    const resp: any = await this.alertService.confirm('This phone will be destroy');
    if(resp.value){
      this.contactService.deletePhoneFromContact(phone._id)
      .subscribe((resp: any) => {
        if(resp.ok){
          this.alertService.toast('Phone deleted from contact!', 'success');
          this.contact.phones = this.contact.phones.filter(ph => ph._id != phone._id);
        }else{
          this.alertService.error('Error', resp.message);
        }
        this.contact.loading = false;
      }, (err) => {
        this.alertService.error('Error', 'Error removing phone from contact');
        console.log(err);
        this.contact.loading = false;
      });
    }
  }

}
