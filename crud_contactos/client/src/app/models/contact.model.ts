
export class Contact{
  public _id: string;
  public name: string;
  public phones: string[];
  public editing: boolean;
  public loading: boolean;
  public editingPhone: boolean;

  constructor(data: any){
    this._id = data._id;
    this.name = data.name;
    this.phones = data.phones;
    this.editing = false;
    this.loading = false;
    this.editingPhone = false;
  }
}