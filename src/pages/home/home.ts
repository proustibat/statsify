import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import * as Occurences from 'Occurences';
import * as Faker from 'faker';
import {PastePage} from "../paste/paste";
import {DataSourceComponent} from "../../components/data-source/data-source";
import {DisplaySettingsComponent} from "../../components/display-settings/display-settings";

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

    sensitiveCase:boolean;
    orderedBy:string;
    limitsOccurrences = {max:1, min:1};

    @ViewChild('dataSource') dataSource: DataSourceComponent;
    @ViewChild('displaySettings') displaySettings: DisplaySettingsComponent;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public changeDetector: ChangeDetectorRef) {
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
        this.sensitiveCase = true;
        this.orderedBy = '';
    }

    getLoremText(): void {
        this.text = Faker.lorem.paragraph();
    }

    createStats(keepSettings:boolean = false): void {
        this.textOccurrences = new Occurences(this.text, {
            biggerThan: 0, // settled in the displayed list
            sensitiveCase:this.sensitiveCase, // an instance is created each time the user changes this setting
            ignored: [] // settled in the displayed list
        });
        this.initReset(keepSettings);
    }

    initReset(keepSettings:boolean = false): void {
        this.statsRaw = Object.keys(this.textOccurrences.stats).map(key => {
            return { value: key, number: this.textOccurrences.stats[key] };
        });
        this.stats = this.statsRaw;
        
        if(this.dataSource) {
            this.dataSource.toggle(true);
        }

        if(!keepSettings) {
            let limitMax = this.statsRaw.reduce((a,b)=>{
                return a.number > b.number ? a : b;
            }).number;


            let limitMin = this.statsRaw.reduce((a,b)=>{
                return a.number < b.number ? a : b;
            }).number;

            this.limitsOccurrences = {
                min: limitMin,
                max: limitMax
            };
            if(this.displaySettings) {
                this.displaySettings.reset({
                    minLength: this.textOccurrences.smallest[0] ? this.textOccurrences.smallest[0].length : 0,
                    maxLength: this.textOccurrences.longest[0] ? this.textOccurrences.longest[0].length : 0,
                    statsRaw: this.statsRaw,
                    minOccurrences: this.limitsOccurrences.min,
                    maxOccurrences: this.limitsOccurrences.max
                });
            }
            this.initSettings();
            this.filterList();
        }
        else {
            if(this.orderedBy && typeof this.orderedBy !== "undefined" && this.orderedBy.length > 0) {
                this.sort(this.orderedBy);
            }
            else {
                this.filterList();
            }
        }
    }

    sort(order:string): void {
        this.stats = this.statsRaw = this.textOccurrences.getSorted(order);
        this.orderedBy = order;
        this.filterList();
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

    onSourceToggle(event): void {
        console.log('Home.onSourceToggle ', event);
    }


    filterList(criteria?:any): void {
        console.log('Home.filterList ', criteria);
        this.stats = this.statsRaw;

        if(this.displaySettings) {
            this.stats = this.stats.filter((item, index) => {
                return this.displaySettings.isValidItem(item);
            });
        }
    }

    onClearAllSettings(): void {
        this.initReset();
        if(this.displaySettings) {
            this.displaySettings.reset();
        }

    }

    ionViewWillLeave() {
        console.log("Looks like I'm about to leave :(");
    }

}
