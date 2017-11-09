import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'display-settings',
    templateUrl: 'display-settings.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplaySettingsComponent {

    @Input('displayedWords') displayedWords;
    @Input('minLength') minLength;
    @Input('maxLength') maxLength;
    @Input('statsRaw') statsRaw;
    @Input('minOccurrences') minOccurrences;
    @Input('maxOccurrences') maxOccurrences;
    @Output() onSettingsChanged = new EventEmitter();

    readMoreSettingsOpened:boolean = false;

    searchTerm:string = '';
    rangeLength: any = {lower: 0, upper: 100}; // will be set by min and max with Occurences data
    timesSettingType: string;
    timesSettingNb:number;


    constructor(private changeDetector: ChangeDetectorRef) {
        console.log('Hello DisplaySettingsComponent Component');
    }

    ngAfterViewInit(): void {
        this.reset();
    }


    reset(data?:any): void {
        console.log('DisplaySettingsComponent.reset : ', data);

      // TODO : verifier le keepsettings lorsqu'on coche case sensitive
        this.readMoreSettingsOpened = false;

        // Avoid ERROR: ExpressionChangedAfterItHasBeenCheckedError
        this.changeDetector.detach();


        // reset search criterion
        this.searchTerm = '';


        // reset range of words length criterion
        this.minLength = (data && data.minLength) ? data.minLength : this.minLength;
        this.maxLength = (data && data.maxLength) ? data.maxLength : this.maxLength;
        this.rangeLength = {
          lower: this.minLength,
          upper: this.maxLength
        };


        // reset number of appearances times criterion
        this.minOccurrences = (data && data.minOccurrences) ? data.minOccurrences : this.minOccurrences;
        this.maxOccurrences = (data && data.maxOccurrences) ? data.maxOccurrences : this.maxOccurrences;
        this.timesSettingType = 'more';
        this.timesSettingNb = this.minOccurrences;
        this.statsRaw = (data && data.statsRaw) ? data.statsRaw : this.statsRaw;



        // Avoid ERROR: ExpressionChangedAfterItHasBeenCheckedError
        this.changeDetector.detectChanges();
        // this.changeDetector.markForCheck();
        this.changeDetector.reattach();


        // Dispatch event of settings changed
        this.dispatchChange();
    }


    // TODO: replace by a toggle
    onReadMoreSettings(): void {
        this.readMoreSettingsOpened = !this.readMoreSettingsOpened;
    }


    dispatchChange(data?:any):void {
        this.onSettingsChanged.emit(data);
    }

    isValidItem(item:{value:string,number:number}): boolean {
        // criterion: research a string
        let searchCond = this.searchTerm ? item.value.toLowerCase().includes(this.searchTerm.toLocaleLowerCase()) : true;

        // criterion: length of words between min and max criteria of the list
        let rangeCond = item.value.length >= this.rangeLength.lower && item.value.length <= this.rangeLength.upper;

        // criterion: occurrences of the word
        let occurrencesSettingsCond = (this.timesSettingType === 'more') ? item.number >= this.timesSettingNb : item.number <= this.timesSettingNb;

        // return all the criteria conditions of list displaying
        return searchCond && rangeCond && occurrencesSettingsCond;
    }


    timesSettings(setting:string): string[] {
        let list:string[] = [];

        if( setting === 'type' ) {
            list = [
                "more",
                "less"
            ];
        }
        else { // setting === 'nb'
            for (let i = this.minOccurrences, l:number = this.maxOccurrences; i <= l; i++ ) {
                list.push((i).toString())
            }
        }
        return list;
    }

}
