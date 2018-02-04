import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component( {
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'display-settings',
    templateUrl: 'display-settings.html',
} )
export class DisplaySettingsComponent {

    @Input( 'displayedWords' ) public displayedWords;
    @Input( 'minLength' ) public minLength;
    @Input( 'maxLength' ) public maxLength;
    @Input( 'minOccurrences' ) public minOccurrences;
    @Input( 'maxOccurrences' ) public maxOccurrences;
    @Output() public onSettingsChanged = new EventEmitter();

    public readMoreSettingsOpened = false;

    public searchTerm = '';
    public rangeLength: any = { lower: 0, upper: 100 }; // will be set by min and max with Occurences data
    public timesSettingType: string;
    public timesSettingNb: number;
    public sensitiveCase = true;

    constructor( private changeDetector: ChangeDetectorRef ) {
        console.log( 'Hello DisplaySettingsComponent Component' );
    }

    public ngAfterViewInit(): void {
        this.reset();
    }

    public reset( data?: {
        minLength?: number,
        maxLength?: number,
        minOccurrences?: number,
        maxOccurrences?: number,
        clear?: boolean
    } ): void {

    // this.readMoreSettingsOpened = false;

    // Avoid ERROR: ExpressionChangedAfterItHasBeenCheckedError
        this.changeDetector.detach();

    // reset search criterion
        this.searchTerm = '';

    // reset range of words length criterion
        this.resetWordsRange( data );

    // reset number of appearances times criterion
        this.resetOccurencesNumber( data );

    // reset sensitive case criterion
        this.sensitiveCase = true;

    // Avoid ERROR: ExpressionChangedAfterItHasBeenCheckedError
        this.changeDetector.detectChanges();
    // this.changeDetector.markForCheck();
        this.changeDetector.reattach();

    // Dispatch event of settings changed
        this.dispatchChange( ( data && data.clear ) ? { clear: true } : null );
    }

    public resetWordsRange( data ) {
    // reset range of words length criterion
        this.minLength = ( data && data.minLength ) ? data.minLength : this.minLength;
        this.maxLength = ( data && data.maxLength ) ? data.maxLength : this.maxLength;
        this.rangeLength = {
            lower: this.minLength,
            upper: this.maxLength
        };
    }

    public resetOccurencesNumber( data ) {
        this.minOccurrences = ( data && data.minOccurrences ) ? data.minOccurrences : this.minOccurrences;
        this.maxOccurrences = ( data && data.maxOccurrences ) ? data.maxOccurrences : this.maxOccurrences;
        this.timesSettingType = 'more';
        this.timesSettingNb = this.minOccurrences;
    }

    public onReadMoreSettings(): void {
        this.readMoreSettingsOpened = !this.readMoreSettingsOpened;
    }

    public dispatchChange( data?: any ): void {
        this.onSettingsChanged.emit( data );
    }

    public isValidItem( item: {value: string, number: number} ): boolean {
    // criterion: research a string
        const valueTlc = item.value.toLowerCase();
        const termTlc = this.searchTerm.toLocaleLowerCase();
        const searchCond = this.searchTerm ? valueTlc.includes( termTlc ) : true;

    // criterion: length of words between min and max criteria of the list
        const rangeCond = item.value.length >= this.rangeLength.lower && item.value.length <= this.rangeLength.upper;

    // criterion: occurrences of the word
        const isMore = this.timesSettingType === 'more';
        const timesSettingNb = this.timesSettingNb;
        const occurrencesSettingsCond = isMore ? item.number >= timesSettingNb : item.number <= timesSettingNb;

    // return all the criteria conditions of list displaying
        return searchCond && rangeCond && occurrencesSettingsCond;
    }

    public timesSettings( setting: string ): string[] {
        let list: string[] = [];

        if ( setting === 'type' ) {
            list = [
                'more',
                'less'
            ];
        } else { // setting === 'nb'
            const l: number = this.maxOccurrences;
            for ( let i = this.minOccurrences; i <= l; i++ ) {
                list.push( ( i ).toString() );
            }
        }
        return list;
    }

}
