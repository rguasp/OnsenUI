/*
Copyright 2013-2014 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsNavigator', function($compile, NavigatorStack, Navigator, $onsen) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      compile: function(element) {
        var html = $onsen.normalizePageHTML(element.html());
        element.contents().remove();

        return {
          pre: function(scope, element, attrs, controller, transclude) {
            var navigator = new Navigator({
              scope: scope, 
              element: element
            });

            $onsen.declareVarAttribute(attrs, navigator);

            var pageScope = navigator._createPageScope();
            var compiledPage = $compile(angular.element(html))(pageScope);
            navigator._pushPageDOM('', compiledPage, pageScope, {});

            NavigatorStack.addNavigator(navigator);
            scope.$on('$destroy', function(){
              NavigatorStack.removeNavigator(navigator);
            });
          }
        };
      }
    };
  });
})();
