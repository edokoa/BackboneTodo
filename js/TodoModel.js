TodoModel = Backbone.Model.extend({

    initialize : function() {
        log('TodoModel initialized');
    },

    defaults : {
        label : 'New todo...',
        done : false
    },

    toggle : function() {
        this.set('done', !this.get('done'));
        log('"done" is now ' + this.get('done'));
    }

});

TodoCollection = Backbone.Collection.extend({

    initialize : function() {
        log('TodoCollection initialized');
    },

    model : TodoModel,

    done : function(val) {
        return this.where({
            done : val
        });
    }

});