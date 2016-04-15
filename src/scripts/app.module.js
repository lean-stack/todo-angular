(function (){
    'use strict';

    // Module Setter
    var app = angular.module('todoApp',['leanTodoStore']);

    app.config(function (todoStorePromiseProvider) {
        todoStorePromiseProvider.setBaseUrl('http://localhost:9000/api');

        console.log('--> Configuring lean angular app ...');
    });

    app.run(function (notifier) {
        console.log('--> Lean app started.')
    });

})();
