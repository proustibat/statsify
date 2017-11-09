import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import * as Occurences from 'Occurences';
import * as Faker from 'faker';
import {PastePage} from "../paste/paste";
import {DataSourceComponent} from "../../components/data-source/data-source";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    text:string;
    textOccurrences:Occurences;
    statsRaw:{ value: string, number:number}[]; // copy of the original data
    stats:{ value: string, number:number}[]; // data used to display results

    isReady:boolean = false;

    rangeLength: any = {lower: 0, upper: 100}; // will be set by min and max with Occurences data
    searchTerm: string;
    timesSettingType: string;
    timesSettingNb:number;
    readMoreSettingsOpened:boolean;
    displayedWords:number;
    sensitiveCase:boolean;
    orderedBy:string;
    @ViewChild('dataSource') dataSource: DataSourceComponent;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    }

    ionViewDidLoad(): void {
        console.log("I'm alive!");
        this.init();
    }

    init():void {
        this.getLoremText();
        this.initSettings();
        this.createStats();
        this.isReady = true;
    }

    initSettings(): void {
        this.searchTerm = '';
        this.timesSettingType = 'more';
        this.timesSettingNb = 1;
        this.readMoreSettingsOpened = false;
        this.sensitiveCase = true;
        this.orderedBy = '';
    }

    getLoremText(): void {
        this.text = Faker.lorem.paragraph();
    }

    createStats(keepSettings:boolean = false): void {
        this.readMoreSettingsOpened = keepSettings;
        this.textOccurrences = new Occurences(this.text, {
            biggerThan: 0, // settled in the displayed list
            sensitiveCase:this.sensitiveCase, // an instance is created each time the user changes this setting
            ignored: [] // settled in the displayed list
        });
        this.initReset(keepSettings);
    }

    initReset(keepSettings:boolean = false): void {
        if(this.dataSource) {
            this.dataSource.reset();
        }

        this.statsRaw = Object.keys(this.textOccurrences.stats).map(key => {
            return { value: key, number: this.textOccurrences.stats[key] };
        });
        this.stats = this.statsRaw;
        if(!keepSettings) {
            this.rangeLength = {
              lower:  this.textOccurrences.smallest[0] ? this.textOccurrences.smallest[0].length : 0,
              upper:  this.textOccurrences.longest[0] ? this.textOccurrences.longest[0].length : 0
            };
            this.initSettings();
            this.setFilteredItems();
        }
        else {
            if(this.orderedBy && typeof this.orderedBy !== "undefined" && this.orderedBy.length > 0) {
                this.sort(this.orderedBy);
            }
            else {
                this.setFilteredItems();
            }
        }
    }

    sort(order:string): void {
        this.stats = this.statsRaw = this.textOccurrences.getSorted(order);
        this.orderedBy = order;
        this.setFilteredItems();
    }


    swap():void {
        let modal = this.modalCtrl.create(PastePage);
        modal.onDidDismiss( data => {
            if(data) {
                this.text = data;
                this.createStats();
            }
        });
        modal.present();
    }

    shuffle(): void {
        this.init();
    }

    setFilteredItems(): void {
        this.stats = this.statsRaw;
        this.stats = this.stats.filter((item, index) => {

            // criterion: research a string
            let searchCond = item.value.toLowerCase().includes(this.searchTerm.toLowerCase());

            // criterion: length of words between min and max criteria of the list
            let lengthOfItem = item.value.length ? item.value.length : 0;
            let rangeCond = lengthOfItem >= this.rangeLength.lower && lengthOfItem <= this.rangeLength.upper;

            // criterion: occurences of the word
            let occurrencesSettingsCond = this.timesSettingType === 'more' ? item.number >= this.timesSettingNb : item.number <= this.timesSettingNb;

            // return all the criteria conditions of list displaying
            return searchCond && rangeCond && occurrencesSettingsCond;
        });
        this.displayedWords = this.stats.length;
    }

    timesSettings(setting:string): string[] {
        let list:string[] = [];

        if(setting === 'type') {
            list = [
                "more",
                "less"
            ];
        }
        else {
            if(this.statsRaw) {
                let limits={max:1, min:1};
                Object.keys(this.statsRaw).forEach( k => {
                    limits.max = Math.max(limits.max, this.statsRaw[k].number);
                    limits.min = Math.min(limits.min, this.statsRaw[k].number);
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

    onSourceToggle(event): void {
        console.log('Home.onSourceToggle ', event);
    }

    onReadMoreSettings(): void {
        this.readMoreSettingsOpened = !this.readMoreSettingsOpened;
    }

    onClearAllSettings(): void {
        this.initReset();
        this.readMoreSettingsOpened = true;

    }

    ionViewWillLeave() {
        console.log("Looks like I'm about to leave :(");
    }

}
