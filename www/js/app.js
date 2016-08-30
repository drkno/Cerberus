let AppName = 'Cerberus';

let Cerberus = angular.module('cerberusApp', [
    'ngRoute',
    'ui.bootstrap',
    'ngTouch',
    'chart.js',
    'btford.socket-io',
    'frapontillo.gage',
    'ui.bootstrap-slider',
    'ui.toggle',
    'cerberusControllers'
]),

routes = [
    {
        path: '/radio',
        templateUrl: 'pages/radio.html',
        controller: 'RadioController',
        name: 'Radio'
    },
    {
        path: '/images',
        templateUrl: 'pages/images.html',
        controller: 'ImagesController',
        name: 'Images'
    }
],

defaultRoute = 0;

Cerberus.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    var def = $routeProvider;
    for (var i = 0; i < routes.length; i++) {
        def = def.when(routes[i].path, routes[i]);
    }
    def.otherwise({
        redirectTo: routes[defaultRoute].path
    });

//    $locationProvider.html5Mode(true);
}]);

let cerberusControllers = angular.module('cerberusControllers', ['ui.bootstrap', 'ngTouch', 'chart.js', 'btford.socket-io', 'frapontillo.gage', 'ui.bootstrap-slider', 'ui.toggle']);

cerberusControllers.factory('socket', function (socketFactory) {
    var ioSocket = io.connect('/', { path: '/cerberus-ws-events' });
    var socket = socketFactory({
        ioSocket: ioSocket
    });
    return socket;
});

// http://stackoverflow.com/questions/23659395/can-i-use-angular-variables-as-the-source-of-an-audio-tag
cerberusControllers.directive('audios', function($sce) {
    return {
        restrict: 'A',
        scope: { code:'=' },
        replace: true,
        template: '<audio ng-src="{{url}}" controls></audio>',
        link: function (scope) {
            scope.$watch('code', function (newVal, oldVal) {
                if (newVal !== undefined) {
                    scope.url = $sce.trustAsResourceUrl(newVal);
                }
            });
        }
    };
});

Cerberus.run(['$route', ($route) => {
    $route.reload();
}]);
