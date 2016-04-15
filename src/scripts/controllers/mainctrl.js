(function() {
  'use strict';

  // Module Getter
  var app = angular.module('todoApp');

  MainController.$inject = ['$scope','todoStorePromise','notifier'];
  function MainController($scope, store, notifier)
  {
    var vm = this;

    store.getAll().then(function(todos) { vm.todos = todos; });

    vm.todoTxt = '';

    vm.create = function() {
      store.create(vm.todoTxt).then(function(todo) {
        vm.todos.push(todo);
        vm.todoTxt = '';
        notifier.show({ type: 'success', msg: 'Todo created' });
      });
    };

    vm.beginEdit = function(t) {
      t.editing = true;
      t.oldValue = t.txt;
    }

    vm.endEdit = function(t) {
      delete t.oldValue;
      delete t.editing;
      store.update(t).then(function(todo) {
        notifier.show({ type: 'success', msg: 'Todo updated' });
      });
    }

    vm.cancelEdit = function(t) {
      if( typeof t.oldValue === 'undefined' ) {
        return;
      }
      t.txt = t.oldValue;
      delete t.oldValue;
      delete t.editing;
    }

    vm.updateTodo = function(t) {
      store.update(t).then(function(todo) {
        notifier.show({ type: 'success', msg: 'Todo updated' });
      });
    }

    vm.deleteTodo = function(t) {
      store.delete(t).then(function() {
        var ix = vm.todos.indexOf(t);
        vm.todos.splice(ix,1);
        notifier.show({ type: 'warning', msg: 'Todo gelöscht' });
      });
    }
  }

  app.controller('mainController',MainController);

}());
