import { Component, OnInit } from '@angular/core';
import { Member} from '../member';
import { MEMBERS } from '../mock-members';
import { MemberServiceService } from '../member-service.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.less']
})
export class MembersComponent implements OnInit {
	
  members: Member[];

  selectedMember: Member;
  
  constructor(private memberService: MemberServiceService) { }

  ngOnInit() {
	  this.getMembers();
  }

  onSelect(member: Member): void {
	  this.selectedMember = member;
	  this.memberService.triggerMessage('MembersComponent: select member '+member.name);
  }
  
  getMembers(): void {
	  this.memberService.getMembers()
		.subscribe(memb => this.members = memb);
  }
  
  save(): void {
	  this.memberService.triggerMessage('MembersComponent: update member '+this.selectedMember.id);
	  this.memberService.update(this.selectedMember);
  }
}
