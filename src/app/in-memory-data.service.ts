import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Member } from './member';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }
  
  createDb() {
	  const members = [
	  	{id: 11, name: 'Mr. MA'},
		{id: 22, name: 'Mr. MB'},
		{id: 33, name: 'Mr. MC'},
		{id: 44, name: 'Mr. MD'},
		{id: 55, name: 'Mr. ME'}
	  ];
	  return {members};
  }
  
  getId(members: Member[]): number {
	  return members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 100;
  }
}
