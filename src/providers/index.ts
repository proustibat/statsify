import {RandomTextProvider} from './random-text/random-text';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicErrorHandler} from 'ionic-angular';
import {ErrorHandler} from '@angular/core';

export const CustomProviders = [
  RandomTextProvider
];

export const ExternalProviders = [
  StatusBar,
  SplashScreen,
  {provide: ErrorHandler, useClass: IonicErrorHandler},
];
