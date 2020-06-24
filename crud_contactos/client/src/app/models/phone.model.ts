
export class Phone{
  public _id: string;
  public phone_number: string;
  public editing: boolean;
  public loading: boolean;

  constructor(data: any){
    this._id = data._id;
    this.phone_number = data.phone_number;
    this.editing = false;
    this.loading = false;
  }
}