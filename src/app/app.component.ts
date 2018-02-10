import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Task } from '../models/Task';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage;

	constructor(
		platform: Platform,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
	) {
		platform.ready().then(() => {
			statusBar.styleDefault()

			Promise.all([
				Task.prepare()
			])
				.then(() => this.rootPage = 'tasks')
				.then(() => splashScreen.hide())
		})
	}
}

