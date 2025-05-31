import {Component} from "@angular/core";

@Component({
    selector: "footer-component",
    templateUrl: "footer.component.html",
    styleUrl: "footer.component.scss",
    standalone: true
})
export class FooterComponent {
    protected currentYear = new Date().getFullYear();
}