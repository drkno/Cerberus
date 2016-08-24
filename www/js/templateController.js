var module = angular.module('wudhaghControllers');
module.controller('TemplateController', ['$scope', '$location',
    function ($scope, $location) {
        $scope.getRoutes = function() {
            return routes;
        }

        $scope.current = function (currLocation) {
            return $location.path().startsWith(currLocation);
        };
    }
]);