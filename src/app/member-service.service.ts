import { Injectable } from '@angular/core';
import { Member } from './member';
import { MEMBERS } from './mock-members';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

  const httpOptions = {
	  headers: new HttpHeaders({'Content-Type': 'application/json' })
  };
  
@Injectable({
  providedIn: 'root'
})
export class MemberServiceService {

  private backServiceUrl = 'api/members';
  
  constructor(
	private http: HttpClient,
	private messageService: MessageService) { }
  
  getMembers(): Observable<Member[]> {
	  this.messageService.add('MemberServiceService: fetch members');
	  return this.http.get<Member[]>(this.backServiceUrl)
				.pipe(
					tap(_ => this.triggerMessage('fetched members')),
					catchError(this.handleError<Member[]>('getMembers',[]))
				);
  }
  
  update(member: Member): Observable<any> {
	  return this.http.put(this.backServiceUrl, member, httpOptions)
				.pipe(
					tap(_ => this.triggerMessage('update member')),
					catchError(this.handleError<Member[]>('update',[]))
				);
  }
  
  getMemberById(id: number): Observable<Member> {
	  const url = '${this.backServiceUrl/${id}';
	  return this.http.get<Member>(url)
				.pipe(
					tap(_ => this.triggerMessage('getched member with id = ${id}')),
					catchError(this.handleError<Member>('getMemberById id = ${id}'))
				);
	  
  }
  triggerMessage(message : string) : void {
	  this.messageService.add(message);
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {
		  console.error(error);
		  this.triggerMessage('${operation} failed: ${error.message}');
		  return of(result as T);
	  };
  }
  
  
}
