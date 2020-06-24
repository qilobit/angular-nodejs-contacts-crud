import { Phone } from './phone.model';

export class Contact{
  public _id: string;
  public name: string;
  public editing: boolean;
  public loading: boolean;
  public phones: Phone[];
  public expanded: boolean;

  constructor(data: any){
    this._id = data._id;
    this.name = data.name;
    this.editing = false;
    this.loading = false;
    this.phones = [];
    this.expanded = true;
  }
}