// import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LinkifyPipe } from './linkify.pipe';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/message/message.component';
import { CalculatePremiumComponent } from './components/calculate-premium/calculate-premium.component';
import {ModalComponent} from './components/modal.component';
import { AppRoutingModule } from './app-routing.module';

import { ChatService } from './services/chat/chat.service';
import { DataService } from './services/data/data.service';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [
      AppComponent,
      ChatComponent,
      MessageComponent,
      LinkifyPipe,
      CalculatePremiumComponent,
      ModalComponent

   
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      AppRoutingModule,
      ReactiveFormsModule
  ],
  exports: [
    ChatComponent
  ],
  providers: [ChatService,DataService,ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
