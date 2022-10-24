import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-square',
    templateUrl: './square.component.html',
    styleUrls: ['./square.component.sass'],
})
export class SquareComponent {
    @Input() value: 'X' | 'O' | undefined;
}
