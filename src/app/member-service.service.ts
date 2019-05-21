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

  private backServiceUrl = 'http://localhost:8080/api/members';
  
  constructor(
	private http: HttpClient,
	private messageService: MessageService) { }
  
  searchMembers(term: string): Observable<Member[]> {
	  const remoteUrl = `${this.backServiceUrl}/search?name=${term}`;
	  
	  if(!term.trim()) {
		  return of([]);
	  }
	  return this.http.get<Member[]>(remoteUrl).pipe(
				tap(_ => this.triggerMessage(`found members for "${term}"`)),
				catchError(this.handleError<Member[]>('searchMembers',[]))
	  );
  }
  
  getMembers(): Observable<Member[]> {
	  this.messageService.add('MemberServiceService: fetch members');
	  return this.http.get<Member[]>(this.backServiceUrl)
				.pipe(
					tap(_ => this.triggerMessage('fetched members')),
					catchError(this.handleError<Member[]>('getMembers',[]))
				);
  }
  
  addMember(m: Member): Observable<Member> {
	  return this.http.post<Member>(this.backServiceUrl, m, httpOptions)
		.pipe(
			tap((newM: Member) => this.triggerMessage(`added member id=${newM.id}`)),
			catchError(this.handleError<Member>('addMember'))
		);
  }
  
  deleteMember(m: Member | number): Observable<Member> {
	  const tid = typeof m === 'number' ? m : m.id;
	  const remoteUrl = `${this.backServiceUrl}/${tid}`;
	  
	  return this.http.delete<Member>(remoteUrl, httpOptions)
			.pipe(
				tap(_ => this.triggerMessage(`deleted member id=${tid}`)),
				catchError(this.handleError<Member>('deleteMember'))
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
	  const url = `${this.backServiceUrl}/${id}`;
	  return this.http.get<Member>(url)
				.pipe(
					tap(_ => this.triggerMessage(`getched member with id = ${id}`)),
					catchError(this.handleError<Member>(`getMemberById id = ${id}`))
				);
	  
  }
  
  triggerMessage(message : string) : void {
	  this.messageService.add(message);
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {
		  console.error(error);
		  this.triggerMessage(`${operation} failed: ${error.message}`);
		  return of(result as T);
	  };
  }
  
  
}
