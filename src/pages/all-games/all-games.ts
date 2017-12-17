import { ToastService } from './../../services/ToastService';
import { Http,Headers } from '@angular/http';
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-all-games',
  templateUrl: 'all-games.html'
})
export class AllGames {
  items: Array<{name: string,company:string, year: string, rate: string,id:Number}>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http,
    public toastSrv:ToastService) {

    this.items = [];
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  getAllGames(limit:Number,skip:Number){
    let options = { headers: new Headers(
      { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Auth-Token')
      }) };
    let queryParam = "?limit="+limit+"&skip="+skip
    let url = "http://localhost:8022/recommender/games"+queryParam
    this.http.get(url,options).subscribe(data=>{
        this.items = data.json();
    },
    err =>{
      console.log('Unexpected error obtaining the recomendations' + err);
      if(err.status !== undefined && err.status === 401){
        localStorage.removeItem('Auth-Token')
        this.toastSrv.createClosableToast('Your current sesion has expired, please log in again.',false)
        this.navCtrl.setRoot(LoginPage)
      }else{
      this.toastSrv.createClosableToast("Error trying to bring Game Library. Please try later")
      }
    })
  }

  ionViewWillEnter(){
    if(!localStorage.getItem('Auth-Token')){
      this.toastSrv.createClosableToast('Your current sesion has expired, please log in again.',false)
      this.navCtrl.setRoot(LoginPage)
    }else{
      this.getAllGames(25,0);
    }
    
  }
}
