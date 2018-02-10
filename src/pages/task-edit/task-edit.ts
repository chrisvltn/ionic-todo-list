import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
	name: 'task-edit',
	segment: 'task/:id'
})
@Component({
	selector: 'page-task-edit',
	templateUrl: 'task-edit.html',
})
export class TaskEditPage { }
