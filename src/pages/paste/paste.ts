import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component( {
    selector: 'page-paste',
    templateUrl: 'paste.html',
} )

export class PastePage {

    public text: string;

    constructor( public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController ) {
    }

    public dismiss( validate = false ): void {
        this.viewCtrl.dismiss( validate ? this.text : null );
    }

}
