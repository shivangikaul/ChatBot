import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    colorBackRight: string = '#007bff';
    colorFontRight: string = '#ffffff';
    colorBackLeft: string = '#eeeeee';
    colorFontLeft: string = '#343a40';

    messages = [];
    sample: string = '';
}