import {Component, Input} from '@angular/core';

@Component({
    selector: 'global-stats',
    templateUrl: 'global-stats.html'
})
export class GlobalStatsComponent {
    @Input('meta') meta;
    @Input('specials') specials;

    constructor() {
        console.log('Hello GlobalStatsComponent Component');
    }

    onSpecialClick(word:string): void {
        console.log('GlobalStatsComponent.onSpecialClick: ', word);
    }

    ionViewDidLoad(): void {
        console.log('ionViewDidLoad: this.meta = ', this.meta);
        console.log('ionViewDidLoad: this.specials = ', this.specials);
    }
}
