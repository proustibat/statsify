import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
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
    statsRaw:{ value: string, number:number}[]; // copy of the original data
    stats:{ value: string, number:number}[]; // data used to display results

    rangeLength: any = {lower: 0, upper: 100}; // will be set by min and max with Occurences data

    searchTerm: string = '';

    displayIsOrdered:boolean = false;

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
        this.textOccurrences = new Occurences(this.text, {
            biggerThan: 0,
            sensitiveCase:true,
            ignored: []
        });
        this.rangeLength.lower = this.textOccurrences.smallest[0].length;
        this.rangeLength.upper = this.textOccurrences.longest[0].length;
        this.statsRaw = Object.keys(this.textOccurrences.stats).map(key => {
            return { value: key, number: this.textOccurrences.stats[key] };
        });
        this.reset();

    }

    reset() {
        this.stats = this.statsRaw;
        this.setFilteredItems();
    }

    sort(order:string) {
        this.displayIsOrdered = true;
        this.stats = this.statsRaw = this.textOccurrences.getSorted(order);
        this.setFilteredItems();
    }


    swap() {
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

    shuffle() {
        this.init();
    }

    setFilteredItems() {
        console.log('setFilteredItem');
        this.stats = this.statsRaw;
        this.stats = this.stats.filter((item, index) => {
            let searchCond = item.value.toLowerCase().includes(this.searchTerm.toLowerCase());
            let rangeCond = item.value.length >= this.rangeLength.lower && item.value.length <=this.rangeLength.upper;
            return searchCond && rangeCond;
        });
    }


    ionViewWillLeave() {
        console.log("Looks like I'm about to leave :(");
    }

}
