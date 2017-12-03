import { ToastService } from './../../services/ToastService';
import { Http,Headers } from '@angular/http';
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-similar-profile-games',
  templateUrl: 'similar-profile-games.html'
})
export class SimilarProfileGames {
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

  getRecommendedGamesBySimilarUsers(){
    let options = { headers: new Headers(
      { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Auth-Token')
      }) };
    let url = "http://localhost:8022/recommender/recommend/byprofile"
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
      this.toastSrv.createClosableToast("Error trying to bring games recommendation based on similar users. Please try later")
      }
    })
  }

  ionViewWillEnter(){
    if(!localStorage.getItem('Auth-Token')){
      this.navCtrl.setRoot(LoginPage)
    }
    this.getRecommendedGamesBySimilarUsers();
  }

  ionViewCanEnter(){
    if(localStorage.getItem('Auth-Token')){
      return true
    }
    return false
  }
}
