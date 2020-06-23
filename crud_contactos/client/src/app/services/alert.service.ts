import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  message(title: string, body: string, icon?: string){
    return Swal.fire({
      title: title,
      text: body,
      icon: icon || 'success'
    });
  }

  toast(message: string, type?: string){
    Swal.fire({
        title: message,
        icon: type || 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
  }

  error(title: string, body: string){
    this.message(title, body, 'error');
  }

  confirm(message: string){
    return Swal.fire({
      reverseButtons: true,
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  }
}
