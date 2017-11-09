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

    ngAfterViewInit(): void {
        console.log('ngAfterViewInit: this.readMoreTextOpened = ', this.readMoreTextOpened);
    }

    toggle(forceClose?:boolean): void {
        this.readMoreTextOpened = forceClose ? false : !this.readMoreTextOpened;
        this.hasToggle.emit({opened: this.readMoreTextOpened});
    }
}
