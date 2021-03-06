import { SimilarProfileGames } from './../pages/similar-profile-games/similar-profile-games';
import { Profile } from './../pages/profile/profile';
import { ToastService } from './../services/ToastService';
import { AllGames } from './../pages/all-games/all-games';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { SignUpPage } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    SignUpPage,
    AllGames,
    Profile,
    SimilarProfileGames   
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    SignUpPage,
    AllGames,
    Profile,
    SimilarProfileGames
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
