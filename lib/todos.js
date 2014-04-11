var tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

function escape(str) {
  return str.replace(/[&<>]/g, function (tag) {
    return tagsToReplace[tag] || tag;
  });
}

function TodoStore() {
  this.todos = [];
  this.lastId = 0;
  this.maxTodos = 8;
}

TodoStore.prototype.getById = function (id) {
  var currentTodo;
  for (var i = 0; i < this.todos.length; i++) {
    currentTodo = this.todos[i];
    if (currentTodo.id === id) {
      return currentTodo;
    }
  }

  return null;
}

TodoStore.prototype.find = function (params, callback) {
  callback(null, this.todos);
}

TodoStore.prototype.get = function (id, params, callback) {
  var todo = this.getById(id);
  if (todo === null) {
    return callback(new Error('Todo not found'));
  }

  callback(null, todo);
}

TodoStore.prototype.create = function (data, params, callback) {
  if(!data.text) {
    return callback(new Error('No text given'));
  }

  var newTodo = {
    id: this.lastId++,
    text: data.text && escape(data.text.substring(0, 60)),
    complete: !!data.complete,
    server: !!data.server
  };

  this.todos.push(newTodo);

  if(this.todos.length > this.maxTodos) {
    return this.remove(this.todos[0].id, {}, function(error) {
      callback(error, newTodo);
    });
  }

  callback(null, newTodo);
}

TodoStore.prototype.update = function (id, data, params, callback) {
  var todo = this.getById(id);
  if (todo === null) {
    return callback(new Error('Todo does not exist'));
  }

  todo.complete = !!data.complete;

  if(data.text) {
    todo.text = escape(data.text.substring(0, 60));
  }

  callback(null, todo);
}

TodoStore.prototype.remove = function (id, params, callback) {
  var todo = this.getById(id);
  if (todo === null) {
    return callback(new Error('Can not delete Todo'));
  }

  this.todos.splice(this.todos.indexOf(todo), 1);
  callback(null, todo);
}

module.exports = TodoStore;
