import { Component, OnInit } from '@angular/core';
import { IMessage } from '../../models/message.model';
import { ContactService } from '../../services/contact.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [CommonModule,DatePipe],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages implements OnInit{
  messages!: IMessage[];

  constructor(private _messageS: ContactService) { }

  ngOnInit(): void {
    this._messageS.getMessages().subscribe(data => {
      this.messages = data;
    });
  }
  
  deleteMessage(id: string) {
    this._messageS.deleteMessage(id).subscribe(data=> console.log(data));
  }

  markAsRead(msg: IMessage) {
    msg.isRead = true;
    this._messageS.updateMessage(msg).subscribe(data=> console.log(data));
    
  }
}
