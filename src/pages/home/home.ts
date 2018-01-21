import {Component, ViewChild} from '@angular/core';
import {ModalController} from 'ionic-angular';
import * as Occurences from 'occurences';
import {PastePage} from '../paste/paste';
import {DataSourceComponent} from '../../components/data-source/data-source';
import {DisplaySettingsComponent} from '../../components/display-settings/display-settings';
import {RandomTextProvider} from '../../providers/random-text/random-text';

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

  constructor(public modalCtrl: ModalController, private randomTextProvider: RandomTextProvider) {}

  ionViewDidLoad() {
    console.log('Hello HomePage');
    this.init();
  }

  async init() {
    await this.getFakeText();
    this.createStats();
  }

  async getFakeText() {
    await this.randomTextProvider.getRandom().then( (data: any) => {
        if (data.error) {
          console.log(data.error.toString());
          console.log(data.details);
        } else {
          this.text = data;
        }
    });
  }

  createStats(keepSettings = false, sensitiveCase = true): void {
    console.log('createStats');
    this.textOccurrences = new Occurences(this.text, {
      biggerThan: 0, // settled in the displayed list
      sensitiveCase, // an instance is created each time the user changes this setting
      ignored: [] // settled in the displayed list
    });
    this.isReady = true;
    this.reset(keepSettings);
  }

  reset(keepSettings = false): void {
    this.statsRaw = this.resetStatsRaw();
    this.stats = this.statsRaw;

    if (!keepSettings) {
      const limitMax = this.getLimit('max');
      const limitMin = this.getLimit('min');

      this.limitsOccurrences = {
        min: limitMin,
        max: limitMax
      };

      if (this.displaySettings) {
        const minLength = this.textOccurrences.smallest[0] ? this.textOccurrences.smallest[0].length : 0;
        const maxLength = this.textOccurrences.longest[0] ? this.textOccurrences.longest[0].length : 0;
        const minOccurrences = this.limitsOccurrences.min;
        const maxOccurrences = this.limitsOccurrences.max;
        this.displaySettings.reset({
          minLength,
          maxLength,
          minOccurrences,
          maxOccurrences
        });
      }

      this.filterList();
    }
  }

  resetStatsRaw() {
    const statsRawKeys = Object.keys(this.textOccurrences.stats);
    return statsRawKeys.map((key) => {
      const n = this.textOccurrences.stats[key];
      return { value: key , number: n };
    });
  }

  getLimit(type) {
    return this.statsRaw.reduce((a, b) => {
      return type === 'min' ? a.number < b.number ? a : b : a.number > b.number ? a : b;
    }).number;
  }

  filterList(data?: any): void {

    this.stats = this.statsRaw;

    if (this.lookForClear(data)) {
      return;
    }

    this.lookForChangeOrder(data);

    this.lookForSensitiveCase(data);

    this.lookForfilters(data);

  }

  lookForClear(data: any) {
    // clear has been requested
    if (data && data.clear) {
      // this.createStats(false, true);
      this.reset();
      return true;
    } else {
      return false;
    }
  }

  lookForChangeOrder(data: any) {
    // order has changed
    if (data && data.orderSort) {
      this.stats = this.statsRaw = this.textOccurrences.getSorted(data.orderSort);
    }
  }

  lookForSensitiveCase(data: any) {
    // sensitive case option has changed
    if (data && typeof data.sensitiveCase === 'boolean') {
      this.createStats(
        true, data.sensitiveCase && true);
    }
  }

  lookForfilters(data: any) {
    // filters have changed
    if (this.displaySettings) {
      this.stats = this.stats.filter((item, index) => {
        return this.displaySettings.isValidItem(item);
      });
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
}
