import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class ToastService {

    constructor(private toastCtrl: ToastController) {

    }

    createClosableToast(msg: string,dismisssPageChange: boolean = true){
        let toast = this.toastCtrl.create({
          message: msg,
          position: 'top',
          showCloseButton: true,
          closeButtonText: "OK",
          dismissOnPageChange: dismisssPageChange
        });
    
        toast.present()
    }
    

}
