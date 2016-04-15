(function() {
  'use strict';

    angular.module('todoApp')
      .directive('enterPressed', function() {
        return {
          restrict: 'A',
          scope: {
            enterPressed: '&'
          },
          link: function(scope,$elt,attrs){
            $elt.on('keypress', function(ev) {
              if( ev.which === 13 ) {
                scope.$apply( function() {scope.enterPressed();});
              }
            });
          }
        };
      });
}());
