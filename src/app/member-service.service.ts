import { Injectable } from '@angular/core';
import { Member } from './member';
import { MEMBERS } from './mock-members';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MemberServiceService {

  constructor(private messageService: MessageService) { }
  
  getMembers(): Observable<Member[]> {
	  this.messageService.add('MemberServiceService: fetch members');
	  return of(MEMBERS);
  }
  triggerMessage(message : string) : void {
	  this.messageService.add(message);
  }
}
