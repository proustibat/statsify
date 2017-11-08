import {Component, Input} from '@angular/core';

@Component({
    selector: 'global-stats',
    templateUrl: 'global-stats.html'
})
export class GlobalStatsComponent {
    @Input('meta') meta;

    constructor() {
        console.log('Hello GlobalStatsComponent Component');
    }
    ionViewDidLoad(): void {
        console.log('ionViewDidLoad: this.meta = ', this.meta);
    }
}
