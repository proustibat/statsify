import { Component, ViewChild } from '@angular/core';
import { ModalController } from 'ionic-angular';
import * as Occurences from 'occurences';
import { PastePage } from '../paste/paste';
import { DataSourceComponent } from '../../components/data-source/data-source';
import { DisplaySettingsComponent } from '../../components/display-settings/display-settings';
import { RandomTextProvider } from '../../providers/random-text/random-text';

@Component( {
    selector: 'page-home',
    templateUrl: 'home.html'
} )

export class HomePage {

    public text: string;
    public textOccurrences: Occurences;
    public statsRaw: Array<{ value: string, number: number}>; // copy of the original data
    public stats: Array<{ value: string, number: number}>; // data used to display results

    public isReady = false;

    public limitsOccurrences: { max: number, min: number };

    @ViewChild( 'dataSource' ) public dataSource: DataSourceComponent;
    @ViewChild( 'displaySettings' ) public displaySettings: DisplaySettingsComponent;

    constructor( public modalCtrl: ModalController, private randomTextProvider: RandomTextProvider ) {}

    public ionViewDidLoad() {
        console.log( 'Hello HomePage' );
        this.init();
    }

    public async init() {
        await this.getFakeText();
        this.createStats();
    }

    public async getFakeText() {
        await this.randomTextProvider.getRandom().then( ( data: any ) => {
            if ( data.error ) {
                console.log( data.error.toString() );
                console.log( data.details );
            } else {
                this.text = data;
            }
        } );
    }

    public createStats( keepSettings = false, sensitiveCase = true ): void {
        console.log( 'createStats' );
        this.textOccurrences = new Occurences( this.text, {
            biggerThan: 0, // settled in the displayed list
            ignored: [], // settled in the displayed list
            sensitiveCase, // an instance is created each time the user changes this setting
        } );
        this.isReady = true;
        this.reset( keepSettings );
    }

    public reset( keepSettings = false ): void {
        this.statsRaw = this.resetStatsRaw();
        this.stats = this.statsRaw;

        if ( !keepSettings ) {
            const limitMax = this.getLimit( 'max' );
            const limitMin = this.getLimit( 'min' );

            this.limitsOccurrences = {
                max: limitMax,
                min: limitMin,
            };

            if ( this.displaySettings ) {
                const minLength = this.textOccurrences.smallest[0].length;
                const maxLength = this.textOccurrences.longest[0].length;
                const minOccurrences = this.limitsOccurrences.min;
                const maxOccurrences = this.limitsOccurrences.max;
                this.displaySettings.reset( {
                    maxLength,
                    maxOccurrences,
                    minLength,
                    minOccurrences,
                } );
            }

            this.filterList();
        }
    }

    public resetStatsRaw() {
        const statsRawKeys = Object.keys( this.textOccurrences.stats );
        return statsRawKeys.map( ( key ) => {
            const n = this.textOccurrences.stats[key];
            return { value: key , number: n };
        } );
    }

    public getLimit( type ) {
        return this.statsRaw.reduce( ( a, b ) => {
            return type === 'min' ? a.number < b.number ? a : b : a.number > b.number ? a : b;
        } ).number;
    }

    public filterList( data?: any ): void {

        this.stats = this.statsRaw;

        if ( this.lookForClear( data ) ) {
            return;
        }

        this.lookForChangeOrder( data );

        this.lookForSensitiveCase( data );

        this.lookForfilters( data );

    }

    public lookForClear( data: any ) {
    // clear has been requested
        if ( data && data.clear ) {
      // this.createStats(false, true);
            this.reset();
            return true;
        } else {
            return false;
        }
    }

    public lookForChangeOrder( data: any ) {
    // order has changed
        if ( data && data.orderSort ) {
            this.stats = this.statsRaw = this.textOccurrences.getSorted( data.orderSort );
        }
    }

    public lookForSensitiveCase( data: any ) {
    // sensitive case option has changed
        if ( data && typeof data.sensitiveCase === 'boolean' ) {
            this.createStats(
        true, data.sensitiveCase && true );
        }
    }

    public lookForfilters( data: any ) {
    // filters have changed
        if ( this.displaySettings ) {
            this.stats = this.stats.filter( ( item, index ) => {
                return this.displaySettings.isValidItem( item );
            } );
        }
    }

    public swap(): void {
        const modal = this.modalCtrl.create( PastePage );
        modal.onDidDismiss( ( data ) => {
            if ( data ) {
                this.text = data;
                this.createStats();
            }
        } );
        modal.present();
    }
}
