var module = angular.module('wudhaghControllers');
module.controller('ShoppingListController', ['$scope', '$http', '$filter', 'socket', function ($scope, $http, $filter, socket) {

        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }
        
        $scope.contextIndex = null;
        $scope.contextItem = null;
        $scope.items = [];
        $scope.suggestions = null;
        $scope.numDays = 0;
        
        $scope.getDays = function () {
            var currMin = new Date();
            for (var i = 0; i < $scope.items.length; i++) {
                if (new Date($scope.items[i].added) < currMin) {
                    currMin = new Date($scope.items[i].added);
                }
            }
            return Math.round(Math.abs(((new Date()).getTime() - currMin.getTime()) / (24 * 60 * 60 * 1000)));
        };
        
        $scope.getCurrent = function () {
            $http({
                method: 'GET',
                url: '/api/current'
            })
            .then(function (response) {
                $scope.items = response.data.items.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (a.name === b.name) return 0;
                    return -1;
                });
                $scope.numDays = $scope.getDays();
            },
            function () {});
        };
        
        $scope.setContext = function (index) {
            $scope.contextItem = angular.copy($scope.items[index]);
            $scope.contextIndex = index;
        };
        
        $scope.resetContext = function () {
            $scope.contextItem = {
                name: "",
                quantity: 1,
                insert: true,
                unit: '#',
                purchased: false
            };
            $scope.suggestions = null;
            $scope.contextIndex = null;
            $scope.getCurrent();
        };
        
        $scope.dtToString = function (d) {
            var dt = new Date(d);
            var day = dt.getDate();
            var month = dt.getMonth() + 1;
            var year = dt.getFullYear();
            var hours = dt.getHours();
            var min = dt.getMinutes();
            
            return day + '/' + pad(month, 2) + '/' + year + ' ' + hours + ':' + pad(min, 2);
        };
        
        $scope.deleteItem = function () {
            var item = {
                removeItem: $scope.contextItem
            };
            $http({
                method: 'POST',
                url: '/api/removeItem',
                data: item
            })
            .then(function () {},
            function () {});
            $scope.resetContext();
        };
        
        $scope.updateItem = function () {
            $http({
                method: 'POST',
                url: '/api/updateItem',
                data: {
                    oldItem: $scope.items[$scope.contextIndex],
                    newItem: $scope.contextItem
                }
            })
            .then(function () {
                $scope.resetContext();
            }, function () {});
        };
        
        $scope.saveItem = function () {
            if (!$scope.contextItem.name || $scope.contextItem.name.trim().length === 0 || !$scope.contextItem.quantity) {
                alert('Invalid input.');
                $scope.resetContext();
                return;
            }
            
            $scope.contextItem.name = $scope.contextItem.name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).trim();
            
            if (!$scope.contextItem.insert) {
                $scope.updateItem();
                return;
            }
            delete $scope.contextItem.insert;
            
            // try to prevent duplicate items
            var filtered = $scope.items.filter(function (obj) {
                return obj.name === $scope.contextItem.name;
            });
            if (filtered.length === 1) {
                var quantity = $scope.contextItem.quantity;
                $scope.contextItem = angular.copy(filtered[0]);
                $scope.contextIndex = $scope.items.indexOf(filtered[0]);
                $scope.contextItem.quantity += quantity;
                $scope.updateItem();
                return;
            }
            
            $scope.contextItem.added = new Date().toISOString();
            $http({
                method: 'POST',
                url: '/api/addItem',
                data: { newItem: $scope.contextItem }
            })
            .then(function () {
                $scope.resetContext();
            }, function () {});
        };
        
        $scope.newList = function () {
            $http({
                method: 'GET',
                url: '/api/new'
            })
            .then(function () {
                $scope.getCurrent();
            },
            function () {});
        };
        
        $scope.getUnit = function (item) {
            if (item.unit && item.unit != '#') {
                var unit = item.unit;
                if (unit.length >= 3 && item.quantity > 1) {
                    switch (unit) {
                        case 'Loaf': unit = 'Loaves'; break;
                        default: unit += 's'; break;
                    }
                }
                return unit;
            }
            return '';
        };
        
        $scope.countItems = function () {
            var counter = 0;
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].unit && $scope.items[i].unit === '#') {
                    counter += $scope.items[i].quantity;
                }
                else {
                    counter += 1;
                }
            }
            return counter;
        };
        
        $scope.getSuggestions = function (val) {
            if ($scope.suggestions === null) {
                return $http({
                    method: 'GET',
                    url: '/api/itemsList'
                })
                .then(function (response) {
                    $scope.suggestions = response.data.items.map(function(item) {
                        return item[0];
                    });
                    return $filter('limitTo')($filter('filter')($scope.suggestions, val), 8);
                },
                function () {
                    return [];
                });
            } else {
                return $filter('limitTo')($filter('filter')($scope.suggestions, val), 8);
            }
        };
        
        $scope.approximateBags = function () {
            var count = $scope.items.length;
            return Math.ceil(count / 5);
        };
        
        $scope.print = function () {
            var printContents = document.getElementById('itemsTable').outerHTML;
            var popupWin = window.open('', '_blank', 'width=300,height=300');
            popupWin.document.open();
            var html = '<!doctype html><html><head><title>Shopping List</title><link rel="stylesheet" type="text/css" href="style.css" /><link rel="stylesheet" type="text/css" href="../bower_components/bootstrap/dist/css/bootstrap.min.css" /><style>.print-remove{display:none;}.table-nonfluid{width:auto !important;}body{font-size:10px}</style></head><body>' + printContents + '<script>setTimeout(function(){window.print();},500);window.onfocus=function(){setTimeout(function(){window.close();},500);}</script></body></html>';
            popupWin.document.write(html);
            popupWin.document.close();
        };

        $scope.swipeLeft = function(index) {
            socket.emit('swipeLeft', angular.toJson($scope.items[index]));
            $scope.items[index].purchased = true;
        };
        
        $scope.swipeRight = function (index) {
            socket.emit('swipeRight', angular.toJson($scope.items[index]));
            $scope.items[index].purchased = false;
        };

        var swipeToggle = function(data) {
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].name === data.name) {
                    $scope.items[i].purchased = data.purchased;
                    break;
                }
            }
        };

        socket.on('swipeLeft', function(data) {
            swipeToggle(data);
        });
        
        socket.on('swipeRight', function (data) {
            swipeToggle(data);
        });

        $scope.resetContext();
    }]);
