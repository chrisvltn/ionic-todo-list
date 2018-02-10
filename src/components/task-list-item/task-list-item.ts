import { Component, Input } from '@angular/core';
import { Task } from '../../models/Task';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
	selector: 'task-list-item',
	templateUrl: 'task-list-item.html'
})
export class TaskListItemComponent {
	@Input() task: Task

	constructor(
		private navCtrl: NavController,
	) { }

	async save() {
		await this.task.save()
	}

	edit() {
		this.navCtrl.push('task-edit', { id: this.task.id })
	}
}
