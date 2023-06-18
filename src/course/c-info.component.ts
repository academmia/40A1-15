import { Component } from "@angular/core";


@Component({
    selector: 'c-info',
    template: `
        <span class="label"> <ng-content></ng-content> </span>
    `,
    styles: [`
        span {
            position: absolute;
            right: 10px;
            top: -12px;
            z-index: 9999;
        }
    `]
})
export class CInfoComponent {

}