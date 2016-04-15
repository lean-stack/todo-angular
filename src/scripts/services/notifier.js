(function() {
  'use strict';

  angular.module('todoApp')
      .factory('notifier', function(){

        return {
          show: function(msg) {
            toastr[msg.type](msg.msg);
          }
        };
      } )
}());
