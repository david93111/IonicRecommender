import { Http,Headers } from '@angular/http';
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: Array<{name: string,company:string, year: string, rate: string}>;
  private error;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http ) {

    this.items = [];
    this.getRecommendedGamesForUser();
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  getRecommendedGamesForUser(){
    let options = { headers: new Headers(
      { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Auth-Token')
      }) };
    let url = "http://localhost:8022/recommender/games"
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
      this.error = err;
    })
  }

  ionViewWillEnter(){
    if(!localStorage.getItem('Auth-Token')){
      this.navCtrl.setRoot(LoginPage)
    }
  }

  ionViewCanEnter(){
    if(localStorage.getItem('Auth-Token')){
      return true
    }
    return false
  }
}
