(function() {
  'use strict';

  // Module Getter
  var app = angular.module('todoApp');

  MainController.$inject = ['todoStorePromise'];
  function MainController(store)
  {
    var vm = this;

    store.getAll().then(function(todos) { vm.todos = todos; });

    vm.todoTxt = '';

    vm.create = function() {
      store.create(vm.todoTxt).then(function(todo) {
        vm.todos.push(todo);
        vm.todoTxt = '';
      });
    };

    vm.beginEdit = function(t) {
      t.editing = true;
      t.oldValue = t.txt;
    }

    vm.endEdit = function(t) {
      delete t.oldValue;
      delete t.editing;
      store.update(t);
    }

    vm.cancelEdit = function(t) {
      if( typeof t.oldValue === 'undefined' ) {
        return;
      }
      t.txt = t.oldValue;
      delete t.oldValue;
      delete t.editing;
    }

    vm.toggleState = function(t) {
      //t.completed = !t.completed;
      store.update(t);
    }

    vm.deleteTodo = function(t) {
      store.delete(t).then(function() {
        var ix = vm.todos.indexOf(t);
        vm.todos.splice(ix,1);
      });
    }
  }

  app.controller('mainController',MainController);

}());
