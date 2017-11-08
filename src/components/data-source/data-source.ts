import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'data-source',
    templateUrl: 'data-source.html'
})
export class DataSourceComponent {
    @Input('readMoreTextOpened') readMoreTextOpened;
    @Output() someEvent = new EventEmitter();
    constructor() {
        console.log('Hello DataSourceComponent Component');
    }
    ionViewDidLoad(): void {
        console.log('ionViewDidLoad: this.readMoreTextOpened = ', this.readMoreTextOpened);
        this.someEvent.emit({data: 'coucou'});
    }
}
