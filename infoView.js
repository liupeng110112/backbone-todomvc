/*
**单条记录的渲染还得依靠集合来渲染
  单条记录模块负责当前记录的视图更新，具体的展现在页面中还需要集合来去实现
 */

var TodoView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#item-template').html()),
	events: {
		'click .destroy':　'clear',
		'dblclick label': 'edit' ,
		'keypress .edit': 'updateOnEnter',
		'click .toggle': 'toggleCompleted'
	},
	initialize: function(){
		this.listenTo(this.model,'change',this.render);
		this.listenTo(this.model,'destroy',this.remove);
		this.listenTo(this.model, 'visible', this.toggleVisible);
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.toggleClass('completed', this.model.get('completed'));
		this.toggleVisible();
		this.$input = this.$('.edit');
		return this;
	},
	remove: function(){
		this.$el.remove();
	},
	toggleVisible: function () {
		this.$el.toggleClass('hidden', this.isHidden());
	},
	isHidden: function () {
		var isCompleted = this.model.get('completed');
		return (// hidden cases only
			(!isCompleted && TodoFilter === 'completed') ||
			(isCompleted && TodoFilter === 'active')
		);
	},
	clear: function(){
		this.model.destroy();
	},
	/*编辑*/
	edit: function(){
		this.$el.addClass('editing');
		this.$input.focus();
	},
	/*编辑确认*/
	updateOnEnter: function(e){
		if(e.keyCode !=13) return;
		var val = this.$('.edit').val();
		this.model.save({title: val});
		this.$el.removeClass('editing');

	},
	toggleCompleted: function(){
		this.model.toggle();
	}
})
