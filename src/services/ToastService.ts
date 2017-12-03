import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class ToastService {

    constructor(private toastCtrl: ToastController) {

    }

    createClosableToast(msg: string){
        let toast = this.toastCtrl.create({
          message: msg,
          position: 'top',
          showCloseButton: true,
          closeButtonText: "OK",
          dismissOnPageChange: true
        });
    
        toast.present()
    }
    

}
