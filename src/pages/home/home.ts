import {Component} from '@angular/core';
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
    searchTerm: string;
    timesSettingType: string;
    timesSettingNb:number;
    readMoreOpened:boolean;
    displayedWords:number;

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
        this.rangeLength.lower = this.textOccurrences.smallest[0] ? this.textOccurrences.smallest[0].length : 0;
        this.rangeLength.upper = this.textOccurrences.longest[0] ? this.textOccurrences.longest[0].length : 0;
        this.statsRaw = Object.keys(this.textOccurrences.stats).map(key => {
            return { value: key, number: this.textOccurrences.stats[key] };
        });
        this.initReset();

    }

    initReset() {
        this.stats = this.statsRaw;

        this.searchTerm = '';
        this.timesSettingType = 'greater';
        this.timesSettingNb = 1;
        this.readMoreOpened = false;

        this.setFilteredItems();
    }

    sort(order:string) {
        this.stats = this.statsRaw = this.textOccurrences.getSorted(order);
        this.setFilteredItems();
    }


    swap() {
        let modal = this.modalCtrl.create(PastePage);
        modal.onDidDismiss( data => {
            if(data) {
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
        this.stats = this.statsRaw;
        this.stats = this.stats.filter((item, index) => {

            // criterion: research a string
            let searchCond = item.value.toLowerCase().includes(this.searchTerm.toLowerCase());

            // criterion: length of words between min and max criteria of the list
            let lengthOfItem = item.value.length ? item.value.length : 0;
            let rangeCond = lengthOfItem >= this.rangeLength.lower && lengthOfItem <= this.rangeLength.upper;

            // criterion: occurences of the word
            let occurrencesSettingsCond = this.timesSettingType === 'greater' ? item.number >= this.timesSettingNb : item.number <= this.timesSettingNb;

            // return all the criteria conditions of list displaying
            return searchCond && rangeCond && occurrencesSettingsCond;
        });
        this.displayedWords = this.stats.length;
    }

    timesSettings(setting:string): string[] {
        let list:string[] = [];

        if(setting === 'type') {
            list = [
                "greater",
                "less"
            ];
        }
        else {
            if(this.statsRaw) {
                let limits={max:0, min:0};
                Object.keys(this.statsRaw).forEach( k => {
                    limits.max = Math.max(limits.max, this.statsRaw[k].number);
                    limits.min = Math.min(limits.max, this.statsRaw[k].number);
                });
                for (let i=limits.min, l:number=limits.max; i<=l;i++ ) {
                    list.push((i).toString())
                }
            }
            else {
                list = [(0).toString()]
            }

        }
        return list;
    }

    occurrencesTimesChosen(): void {
        console.log(this.timesSettingType);
        console.log(this.timesSettingNb);
        this.setFilteredItems();
    }

    onReadMore(event:Event) {
        this.readMoreOpened = !this.readMoreOpened;
    }


    ionViewWillLeave() {
        console.log("Looks like I'm about to leave :(");
    }

}
