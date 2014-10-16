var todo = Backbone.Model.extend({
  defaults: {
    title: 'empty todo',
    completed: false
  },
  toggle: function(){
  	this.save({completed:!this.get('completed')});
  }
})
