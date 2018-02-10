import { Component } from '@angular/core';

@Component({
	selector: 'task-list-item',
	templateUrl: 'task-list-item.html'
})
export class TaskListItemComponent {
	text: string;

	constructor() {
		console.log('Hello TaskListItemComponent Component');
		this.text = 'Hello World';
	}

}
