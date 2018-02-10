import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TaskListPageModule } from '../pages/task-list/task-list.module';
import { TaskEditPageModule } from '../pages/task-edit/task-edit.module';

@NgModule({
	declarations: [
		MyApp,
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		TaskListPageModule,
		TaskEditPageModule,
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
	]
})
export class AppModule { }
