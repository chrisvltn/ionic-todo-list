import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Task } from '../../models/Task';

@IonicPage({
	name: 'tasks',
	segment: 'tasks',
})
@Component({
	selector: 'page-task-list',
	templateUrl: 'task-list.html',
})
export class TaskListPage {
	tasks: Task[] = []

	async ionViewWillEnter() {
		this.tasks = await Task.findAll()
	}
}
