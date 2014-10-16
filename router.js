var TodoRouter = Backbone.Router.extend({
	routes: {
		'*filter': 'setFilter'
	},

	setFilter: function (param) {
		// Set the current filter to be used
		TodoFilter = param || '';
		// Trigger a collection filter event, causing hiding/unhiding
		// of Todo view items
		todos.trigger('filter');
	}
})
TodoRouter = new TodoRouter();
Backbone.history.start();
