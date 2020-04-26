import { Component, OnInit, Input, Directive } from '@angular/core';
import { FormGroup , FormBuilder, Validators  } from '@angular/forms';

import { ChatService } from '../../services/chat/chat.service';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-calculate-premium',
  templateUrl: './calculate-premium.component.html',
  styleUrls: ['./calculate-premium.component.css'],
})
export class CalculatePremiumComponent implements OnInit {
    
    premiumForm = new FormGroup({});
    submitted = false;
    constructor(private formbuilder: FormBuilder,
    private dataService: DataService,
    private chatService:ChatService
    ) { }

  get f() { return this.premiumForm.controls; }

  ngOnInit() {
    this.premiumForm = this.formbuilder.group({
      age: ['', Validators.required],
      bmi: ['', Validators.required],
      children: ['', Validators.required],
      bp: ['', Validators.required],
      smoker: ['',Validators.required],
      gender: ['',Validators.required]
  });
  }
  onSubmit() {
    this.submitted = true;
    let messageBack = {"text": {
      "chat": "yes",
      "values1": this.premiumForm.value}
    };
    this.chatService.sendMessage(messageBack)
    .subscribe(data => {
      console.log(data)
      let text = JSON.parse(data["_body"]).charges;
      let messageReturn = {"text": text, "userOwner": false};
      this.dataService.changeMessage(messageReturn);
})
}
}
