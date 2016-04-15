(function() {
  'use strict';

    angular.module('todoApp')
      .directive('cancelEdit', function() {
        return {
          restrict: 'A',
          scope: {
            cancelEdit: '&'
          },
          link: function(scope,$elt,attrs){
            $elt.on('keyup', function(ev) {
              if( ev.which === 27 ) {
                scope.$apply( function() {scope.cancelEdit();});
              }
            });
            $elt.on('focusout', function(ev) {
              scope.$apply( function() {scope.cancelEdit();});
            });
          }
        };
      });
}());
