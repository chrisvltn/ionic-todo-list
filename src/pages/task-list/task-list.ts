import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
	name: 'tasks',
	segment: 'tasks',
})
@Component({
	selector: 'page-task-list',
	templateUrl: 'task-list.html',
})
export class TaskListPage { }
