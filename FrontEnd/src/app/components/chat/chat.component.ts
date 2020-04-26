import { Component, Input } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { ModalService } from '../../services/modal.service';

import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

    BACK_ENABLED: boolean = true;
    FeedBackBtn: boolean=false;
    messages = [];
    text1: string;
  text2: string;
  text3: string;
  text4: string;
  message: string = '';
    textInput: string = '';
    subscription: any;
    formDisplay: string = '';
    // @Input('messages') messages: any[];
    @Input('colorBackRight') colorBackRight : string;
    @Input('colorFontRight') colorFontRight: string;
    @Input('colorBackLeft') colorBackLeft: string;
    @Input('colorFontLeft') colorFontLeft: string;
    @Input('sample') sample: string;

    
    constructor(private chatService: ChatService,private modalService:ModalService,private data: DataService,) {
     
    }

    ngOnInit() {
      this.colorBackRight = '#007bff';
       this.colorFontRight = '#ffffff';
      this.colorBackLeft = '#fff';
      this.colorFontLeft = '#343a40'
      if (this.messages.length == 0) {
        let check = this.data.getMessage();
        if (check.length == 0) {
          return;
        }
        else {
          this.messages = check;
        }
      }
    }

    sendMessage() {
      this.sample = "";
      this.FeedBackBtn=false;
      let newMessage = {"text": this.textInput, "date":"", "userOwner":true};
      this.messages.push(newMessage);
      let messageBack = {"text": {"chat": this.textInput}};
      if (this.BACK_ENABLED) {
        this.chatService.sendMessage(messageBack)
        .subscribe(data => {
        console.log("We got", data);
        let text = JSON.parse(data["_body"]).message;
        this.formDisplay = JSON.parse(data["_body"]).formDisplay;
        let messageReturn = {"text": text, "userOwner": false};
        this.messages.push(messageReturn);
        if (this.formDisplay == "yes") {
          this.data.saveMessage(this.messages);
          this.sample = "Click @here to fill the form";
          this.getData();
        }
      })
    }
      if(newMessage.text=='bye\n'||newMessage.text=='quit\n'){
        this.FeedBackBtn=true;
      }
      this.textInput = '';    
    }

    getData() { 
      this.data.currentMessage.subscribe(value => {this.message = value;
      })
          if (this.message == "default message") {
            setTimeout(()=>{ 
              this.getData();
            }, 1000);
            }
          else {
            this.messages.push(this.message);
            return;
          }
    }
  
  
  
  
  
  
  // sendMessage() {
  // this.FeedBackBtn = false;
  //   let newMessage = { "text": this.textInput, "date": "", "userOwner": true };
  //   this.messages.push(newMessage);
  //   let messageBack = { "text": { "chat": this.textInput } };
  //   if (this.BACK_ENABLED) {
  //     this.chatService.sendMessage(messageBack)
  //       .subscribe(data => {
  //         console.log("We got", data);
  //         //let text=JSON.stringify(data["_body"])
  //         let text = JSON.parse(data["_body"]).message;
  //         //this.formDisplay = JSON.parse(data["_body"]).displayForm;
  //         let messageReturn = { "text": text, "date": "", "userOwner": false };
  //         this.messages.push(messageReturn);
  //         // this.say(text);
  //         //           setTimeout(() => {
  //         //              var el = document.getElementById("chatMsg");
  //         // el.scrollTop = el.scrollHeight ;
  //         //           }, 500);

  //         // if (this.formDisplay == "yes") {
  //         //   this.sample = "Click @here to fill the form"
  //         //   console.log (this.sample);
  //         // }

  //       })
  //   }



  //   if (newMessage.text == 'bye\n' || newMessage.text == 'quit\n') {
  //     this.FeedBackBtn = true;
  //   }
  //   this.textInput = '';






  // }


  submitFeedBack() {

    console.log("Inside the submitFeedBack func " + this.text1 + this.text2 + this.text3 + this.text4);
    let msgSubmit = { "text": { "chat": "quit", "values1": { "a": this.text1, "b": this.text2, "c": this.text3, "d": this.text4 } } };
    this.chatService.sendMessage(msgSubmit).subscribe(data => {
      console.log("We got", data);
      let text = JSON.parse(data["_body"]).chat;
      let review = JSON.parse(data["_body"]).review;
      let msgFeedBack = { "text": text + " " + review, "date": "", "userOwner": false };
      this.messages.push(msgFeedBack);
      this.FeedBackBtn = false;
      this.closeModal("FeedBackModal");
    })


  }



  ngForCallback() {
    var el = document.getElementById("chatMsg");
    el.scrollTop = el.scrollHeight;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onKey(event: any) {
    if (event.keyCode == 13) {
      this.sendMessage()
    }

    this.text1 = event.target.value;

  }
  onKey1(event: any) {
    this.text1 = event.target.value;
  }
  onKey2(event: any) {
    this.text2 = event.target.value;
  }
  onKey3(event: any) {
    this.text3 = event.target.value;
  }
  onKey4(event: any) {
    this.text4 = event.target.value;
  }
}
