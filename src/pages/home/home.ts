import {Component, ViewChild} from '@angular/core';
import {ModalController} from 'ionic-angular';
import * as Faker from 'faker';
import * as Occurences from 'occurences';
import {PastePage} from '../paste/paste';
import {DataSourceComponent} from '../../components/data-source/data-source';
import {DisplaySettingsComponent} from '../../components/display-settings/display-settings';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    text: string;
    textOccurrences: Occurences;
    statsRaw: Array<{ value: string, number: number}>; // copy of the original data
    stats: Array<{ value: string, number: number}>; // data used to display results

    isReady = false;

    limitsOccurrences: { max: number, min: number };

    @ViewChild('dataSource') dataSource: DataSourceComponent;
    @ViewChild('displaySettings') displaySettings: DisplaySettingsComponent;

    constructor(public modalCtrl: ModalController) {}

    ionViewDidLoad(): void {
        console.log('Hello HomePage');
        this.init();
    }

    init(): void {
        this.getFakeText();
        this.createStats();
    }

    getFakeText(): void {
        this.text = Faker.lorem.paragraph();
    }

    createStats(keepSettings = false, sensitiveCase = true): void {
        this.textOccurrences = new Occurences(this.text, {
            biggerThan: 0, // settled in the displayed list
            sensitiveCase, // an instance is created each time the user changes this setting
            ignored: [] // settled in the displayed list
        });
        this.isReady = true;
        this.reset(keepSettings);
    }

    reset(keepSettings = false): void {
        this.statsRaw = Object.keys(this.textOccurrences.stats).map((key) => {
            return { value: key, number: this.textOccurrences.stats[key] };
        });

        this.stats = this.statsRaw;

        if (!keepSettings) {
            const limitMax = this.statsRaw.reduce((a, b) => {
                return a.number > b.number ? a : b;
            }).number;

            const limitMin = this.statsRaw.reduce((a, b) => {
                return a.number < b.number ? a : b;
            }).number;

            this.limitsOccurrences = {
                min: limitMin,
                max: limitMax
            };
            if (this.displaySettings) {
                this.displaySettings.reset({
                    minLength: this.textOccurrences.smallest[0] ? this.textOccurrences.smallest[0].length : 0,
                    maxLength: this.textOccurrences.longest[0] ? this.textOccurrences.longest[0].length : 0,
                    minOccurrences: Number(this.limitsOccurrences.min),
                    maxOccurrences: Number(this.limitsOccurrences.max)
                });
            }
            this.filterList();
        }
    }

    swap(): void {
        const modal = this.modalCtrl.create(PastePage);
        modal.onDidDismiss((data) => {
            if (data) {
                this.text = data;
                this.createStats();
            }
        });
        modal.present();
    }

    filterList(data?: any): void {

        this.stats = this.statsRaw;

        // clear has been requested
        if (data && data.clear) {
            // this.createStats(false, true);
            this.reset();
            return;
        }

        // order has changed
        if (data && data.orderSort) {
            this.stats = this.statsRaw = this.textOccurrences.getSorted(data.orderSort);
        }

        // sensitive case option has changed
        if (data && typeof data.sensitiveCase === 'boolean') {
            this.createStats(
                true, data.sensitiveCase && true);
        }

        // filters have changed
        if (this.displaySettings) {
            this.stats = this.stats.filter((item, index) => {
                return this.displaySettings.isValidItem(item);
            });
        }

    }
}
