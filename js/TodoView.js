TodoListView = Backbone.View.extend({

    el : $('#list')[0],

    initialize : function() {
        log('TodoView initialized');
        this.listenTo(this.collection, 'add', this.addTodo);
    },

    events : {
        'keypress #newTodo' : 'onKeyPress',
        'click #clear' : 'clearDone'
    },

    onKeyPress : function(e) {

        if (e.keyCode == 13) {

            var $input = this.$('#newTodo');

            this.collection.add({
                label : $input.val()
            });

            $input.val('');

        }

    },

    clearDone : function() {
        this.collection.remove(this.collection.done(true));
        return false;
    },

    render : function() {
        this.collection.each(this.addTodo.bind(this));
        return this;
    },

    addTodo : function(todo) {
        var view = new TodoView({
            model : todo
        });
        this.$('ul').append(view.render().el);
    }

});

TodoView = Backbone.View.extend({

    tagName : 'li',

    initialize : function() {

        log('TodoView initialized');

        this.listenTo(this.model.collection, 'remove', this.onRemove);

        if (this.model.get('done'))
            this.$el.addClass('done');
    },

    template : _.template($('#todoTemplate').html()),

    events : {
        'click :checkbox' : 'toggle',
        'click a' : 'deleteTodo'
    },

    toggle : function() {
        this.model.toggle();
        this.$el.toggleClass('done', this.model.get('done'));
    },

    deleteTodo : function() {
        this.model.collection.remove(this.model);
        return false;
    },

    onRemove : function(model) {
        if (this.model === model)
            this.remove();
    },

    render : function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});