import { NgModule } from '@angular/core';
import { TaskListItemComponent } from './task-list-item/task-list-item';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [TaskListItemComponent],
	imports: [
		IonicModule,
	],
	exports: [TaskListItemComponent]
})
export class ComponentsModule { }
