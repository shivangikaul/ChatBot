import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component'
import { MessageComponent } from './components/message/message.component';
import { CalculatePremiumComponent } from './components/calculate-premium/calculate-premium.component';

const routes: Routes = [
  { path: '', component: ChatComponent },
  { path: '', component: MessageComponent },
  { path: 'form', component: CalculatePremiumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
