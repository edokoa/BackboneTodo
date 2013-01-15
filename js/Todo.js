log = console.log.bind(console);

coll = new TodoCollection([ {
    id : 1
}, {
    id : 2
} ]);

view = new TodoListView({
    collection : coll
});

view.render();