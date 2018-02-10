import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Task } from '../../models/Task';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@IonicPage({
	name: 'task-edit',
	segment: 'task/:id'
})
@Component({
	selector: 'page-task-edit',
	templateUrl: 'task-edit.html',
})
export class TaskEditPage {
	taskId: number
	task: Task
	edit: boolean

	constructor(
		params: NavParams,
		private navCtrl: NavController,
	) {
		this.taskId = params.get('id')
		this.edit = !!this.taskId
		this.task = Task.parse()
	}

	async ngOnInit() {
		if (!this.taskId) return;
		this.task = await Task.findById(this.taskId)
	}

	async save() {
		await this.task.save()
		this.navCtrl.pop()
	}
}
