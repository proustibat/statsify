import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'data-source',
    templateUrl: 'data-source.html'
})
export class DataSourceComponent {
    @Output() toggle = new EventEmitter();
    readMoreTextOpened:boolean;

    constructor() {
        console.log('Hello DataSourceComponent Component');
        this.reset();
    }

    ionViewDidLoad(): void {
        console.log('ionViewDidLoad: this.readMoreTextOpened = ', this.readMoreTextOpened);
    }

    reset(): void {
        this.readMoreTextOpened = false;
    }

    onReadMoreText(): void {
        this.readMoreTextOpened = !this.readMoreTextOpened;
        this.toggle.emit({opened: this.readMoreTextOpened});
    }
}
