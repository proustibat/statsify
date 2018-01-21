import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'data-source',
    templateUrl: 'data-source.html'
})
export class DataSourceComponent {
    readMoreTextOpened = false;
    @Output() onShuffle = new EventEmitter();
    @Output() onSwap = new EventEmitter();

    toggle(forceClose?: boolean): void {
        this.readMoreTextOpened = forceClose ? false : !this.readMoreTextOpened;
    }

    shuffle(): void {
        this.onShuffle.emit();
    }

    swap(): void {
        this.onSwap.emit();
    }
}
