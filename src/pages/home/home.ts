import { Component } from '@angular/core';
import { FabContainer, ModalController, NavController } from 'ionic-angular';
import * as Occurences from 'Occurences';
import * as Faker from 'faker';
import {PastePage} from "../paste/paste";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    text:string;
    textOccurrences:Occurences;
    stats:{ value: string, number:number}[];
    statsRaw:{ value: string, number:number}[];

    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    }

    ionViewDidLoad() {
        console.log("I'm alive!");
        this.init();
    }

    init() {
        this.getLoremText();
        this.createStats();
    }

    getLoremText() {
        this.text = Faker.lorem.paragraph();
    }

    createStats() {
        this.textOccurrences = new Occurences(this.text);
        this.statsRaw = Object.keys(this.textOccurrences.stats).map(key => {
            return { value: key, number: this.textOccurrences.stats[key] };
        });
        this.reset();
    }

    reset(fab?: FabContainer) {
        this.stats = this.statsRaw;
        fab ? fab.close() : '';
    }

    sort(order:string, fab: FabContainer) {
        this.stats = this.textOccurrences.getSorted(order);
        fab.close();
    }


    swap(fab: FabContainer) {
        fab.close();
        let modal = this.modalCtrl.create(PastePage);
        modal.onDidDismiss( data => {
            if(data) {
                console.log(data);
                this.text = data;
                this.createStats();
            }
        });
        modal.present();
    }

    shuffle(fab?: FabContainer) {
        this.init();
        fab ? fab.close() : '';
    }

    ionViewWillLeave() {
        console.log("Looks like I'm about to leave :(");
    }

}
