import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';

import './main.html';
import '../lib/Collections.js';



Accounts.ui.config({});
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});


Template.AddTask.events({
	'click .js-addTask'(){
		console.log("hello")
		$("#addTaskModal").modal("show")
	},

	'click .js-cancelTask'(){
		$("#Task").val('');
		$("#addTaskModal").modal("hide")
		console.log("bye")
	},

	'click .js-saveTask'(){
		var Task = $("#Task").val();
		console.log("save", Task);

		//$("#Task").val('');
		$("#addTaskModal").modal("hide")
		userDB.insert({"Task": Task,})
	},
})


Template.Task.helpers({
	allTask(){
		return userDB.find({});
	},

	userLoggedIn(){
		if (Meteor.user()){
			return true;
		} else {
			return false;
		}
	}

});

Template.Task.events({
		'click .js-deleteTask'(){
		var taskID = this._id
		$("#"+taskID).fadeOut('slow',function(){
			userDB.remove({_id:taskID});
			console.log("delete", taskID)

		})
	},
});





