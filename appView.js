var appView = Backbone.View.extend({
	el: '#todoapp',
	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #toggle-all': 'toggleAllComplete',
		'click #clear-completed': 'clearCompleted'
	},
	template:_.template($('#stats-template').html()),
	initialize: function(){
		this.allCheckbox = this.$('#toggle-all')[0];
		this.input = this.$('#new-todo');
		this.$list = this.$('#todo-list');
		this.$main = this.$('#main');
		this.$footer = this.$('#footer');
		// 用于监听新纪录的生成并渲染到视图上
		this.listenTo(todos,'add',this.addOne);
		this.listenTo(todos,'destory',this.destory);
		// 初始化的时候从本地存储或者后台取出所有的数据 进行视图渲染
		this.listenTo(todos,'reset',this.addAll);
		this.listenTo(todos, 'all', this.render);

		this.listenTo(todos, 'change:completed', this.filterOne);
		this.listenTo(todos, 'filter', this.filterAll);

		// 用于触发reset事件
		todos.fetch({reset: true});
	},
	render: function(){
		var compeleted = todos.completed().length;
		var remaining = todos.remaining().length;
		console.log(compeleted);
		if(todos.length > 0){
			this.$main.show();
			this.$footer.show();

			this.$footer.html(this.template({
				completed : compeleted,
				remaining : remaining
			}));

			this.$('#filters li a')
				.removeClass('selected')
				.filter('[href="#/' + (TodoFilter || '') + '"]')
				.addClass('selected');
		}else{
			this.$main.hide();
			this.$footer.hide();
		}
	},
	addOne: function(todo){
		//返回单个记录的视图
		var view = new TodoView({model: todo});
		this.$list.append(view.render().el);

	},
	addAll: function(){
		todos.each(this.addOne,this)
	},
	filterOne: function(){
		todo.trigger('visible');
	},
	filterAll: function () {
		todos.each(this.filterOne, this);
	},
	createOnEnter: function(e){
		if(this.input.val().trim() == '') return;
		if(e.which != 13) return;
		// 这个会触发集合的add以及save
		todos.create({title: this.input.val()});
		this.input.val('');
	},
	toggleAllComplete: function(){
		var completed = this.allCheckbox.checked;

		todos.each(function(todo){
			todo.save({
				completed: completed
			})
		})
	},
	clearCompleted:function(){
		_.invoke(todos.completed(), 'destroy');
		return false;
	},
	filterOne: function (todo) {
		todo.trigger('visible');
	},
	filterAll: function () {
		todos.each(this.filterOne, this);
	}
})
