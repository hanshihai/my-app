import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Member } from '../member';
import { MemberServiceService } from '../member-service.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.less']
})
export class MemberSearchComponent implements OnInit {
  
  public searchBox: string;
  
  members$: Observable<Member[]>;
  
  private searchTerms = new Subject<string>();
  
  constructor(private memberService: MemberServiceService) { }
  
  search(term: string): void {
	  this.searchTerms.next(term);
  }

  ngOnInit() {
	  this.searchBox = 'input search keyword';
	  
	  this.members$ = this.searchTerms.pipe(
		debounceTime(300),
		distinctUntilChanged(),
		switchMap((term: string) => this.memberService.searchMembers(term))
	  );
  }

}
