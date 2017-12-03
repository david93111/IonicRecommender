import { ToastService } from './../../services/ToastService';
import { Http,Headers } from '@angular/http';
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { LoginPage } from '../login/login';

@Component({
  selector: 'all-games',
  templateUrl: 'all-games.html'
})
export class AllGames {
  items: Array<{name: string,company:string, year: string, rate: string}>;
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
      if(data.status===401){
        localStorage.removeItem('Auth-Token')
        this.navCtrl.setRoot(LoginPage)
      }else{
        this.items = data.json();
      }
    },
    err =>{
      console.log('Unexpected error obtaining the recomendations' + err);
      this.toastSrv.createClosableToast("Error trying to bring Game Library, please try later")
    })
  }

  ionViewWillEnter(){
    if(!localStorage.getItem('Auth-Token')){
      this.navCtrl.setRoot(LoginPage)
    }
    this.getAllGames(25,0);
  }

  ionViewCanEnter(){
    if(localStorage.getItem('Auth-Token')){
      return true
    }
    return false
  }
}
