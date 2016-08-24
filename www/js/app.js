var Wudhagh = angular.module('Wudhagh', [
    'ngRoute',
    'ui.bootstrap',
    'ngTouch',
    'chart.js',
    'btford.socket-io',
    'wudhaghControllers',
	'angular-touchspin'
]),

routes = [
    {
        path: '/shoppinglist',
        templateUrl: 'pages/shoppinglist.html',
        controller: 'ShoppingListController',
        name: 'Shopping List'
    },
    {
        path: '/shoppinghistory',
        templateUrl: 'pages/shoppinghistory.html',
        controller: 'ShoppingHistoryController',
        name: 'Shopping History'
    }
],

defaultRoute = 0;

Wudhagh.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    var def = $routeProvider;
    for (var i = 0; i < routes.length; i++) {
        def = def.when(routes[i].path, routes[i]);
    }
    def.otherwise({
        redirectTo: routes[defaultRoute].path
    });

//    $locationProvider.html5Mode(true);
}]);

var wudhaghControllers = angular.module('wudhaghControllers', ['ui.bootstrap', 'ngTouch', 'chart.js', 'btford.socket-io', 'angular-touchspin']);

wudhaghControllers.factory('socket', function (socketFactory) {
    var wudhaghIoSocket = io.connect('/', { path: '/wudhagh-ws-events' });
    var wudhaghSocket = socketFactory({
        ioSocket: wudhaghIoSocket
    });
    return wudhaghSocket;
});