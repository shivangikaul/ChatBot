import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; 



@Component({
  selector: 'message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {
    display:boolean = false;

    @Input('text') text: string; 
    @Input('date') date: any;
    @Input('owner') owner: boolean;
    @Input('form') form: string;
    @Input('messages') messages: any[];
    @Input('colorBackRight') colorBackRight : string;
    @Input('colorFontRight') colorFontRight: string;
    @Input('colorBackLeft') colorBackLeft: string;
    @Input('colorFontLeft') colorFontLeft: string;


    constructor(private router: Router) {}
    ngOnInit() {
      if(this.form == "Click @here to fill the form"){
        this.display = true;
      }
      else{
        this.form = "";
        this.display = false;
      }
    }
    
    displayForm() {
      this.form = "";
      this.display = false;
      this.router.navigate(['form']);
    }
}
