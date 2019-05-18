import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';

import './main.html';
import '../lib/Collections.js';




lastScrollTop = 0; 
$(window).scroll(function(event){
	// test if we are near the bottom of the window
	if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
		// where are we in the page? 
		var scrollTop = $(this).scrollTop();
		// test if we are going down
		if (scrollTop > lastScrollTop){
			// yes we are heading down...   
		 console.log("We have arrived at the bottom of the page");
			// yes we are heading down...
			Session.set('imgLimit', Session.get('imgLimit') + 3);

		}
		lastScrollTop = scrollTop;
	}
});

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

	'click .js-public'(){
		console.log("public")
		if(option1.checked==true)
		alert("You selected "+option1.value);
		


	},

	'click .js-private'(){
		console.log("private")
		if(option2.checked==true)
		alert("you selected "+option2.value);
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
	},

	tasksFound(){
		return userDB.find().count();
	},

	optionpublic(){
		if (option1.checked==true)
			return true;
	},

	optionprivate(){
		if (option2.checked==true)
			return true;
	}


});
Template.hello.helpers({
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




