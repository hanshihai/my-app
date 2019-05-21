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

  public addMember: string;
  
  constructor(private memberService: MemberServiceService) { }

  ngOnInit() {
    this.addMember = 'please input member name';

	  this.getMembers();
  }
  
  delete(member: Member): void {
	  this.members = this.members.filter(m => m !== member);
	  this.memberService.deleteMember(member).subscribe();
  }

  add(addedName: string): void {
    const m : Member = {
      id: 0,
      name: addedName
    }

    addedName = addedName.trim();
    if(!addedName) {return;}
    this.memberService.addMember(m)
      .subscribe(m => {
        this.members.push(m);
      });
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
	  this.memberService.update(this.selectedMember).subscribe();
  }
}
