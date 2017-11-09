import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'data-source',
    templateUrl: 'data-source.html'
})
export class DataSourceComponent {
    @Output() hasToggle = new EventEmitter();
    readMoreTextOpened:boolean = false;

    constructor() {
        console.log('Hello DataSourceComponent Component');
    }

    toggle(forceClose?:boolean): void {
        this.readMoreTextOpened = forceClose ? false : !this.readMoreTextOpened;
        this.hasToggle.emit({opened: this.readMoreTextOpened});
    }
}
