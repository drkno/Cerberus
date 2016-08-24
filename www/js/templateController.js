cerberusControllers.controller('TemplateController', ['$scope', '$location',
    function ($scope, $location) {
        $scope.appName = AppName;

        $scope.getRoutes = function() {
            return routes;
        }

        $scope.current = function (currLocation) {
            return $location.path().startsWith(currLocation);
        };
    }
]);
