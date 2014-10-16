var Todos = Backbone.Collection.extend({
  model : todo,//指定model为todo
  localStorage: new Backbone.LocalStorage('todos-backbone'),
  completed: function(){
    return this.where({completed: true});
  },
  remaining: function(){
    return this.where({completed: false});
  },
  nextOrder: function () {
    return this.length ? this.last().get('order') + 1 : 1;
  },

  // Todos are sorted by their original insertion order.
  comparator: 'order'
})
var todos = new Todos
