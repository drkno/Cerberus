var module = angular.module('wudhaghControllers');
module.controller('ShoppingHistoryController', [
    '$scope', '$http', '$filter', function ($scope, $http, $filter) {

        $scope.shopsChart = {
            labels: [],
            series: [],
            data: []
        };

        $scope.itemsPie = {
            labels: [],
            data: [],
            legend: false,
            toggleLegend: function (s) {
                if (s || s === false) {
                    this.legend = s;
                }
                else {
                    this.legend = !this.legend;
                }
                var outcome = this.legend? 'block' : 'none';
                $('chart-legend').css('display', outcome);
            }
        };

        $scope.top = {
            total: 0,
            top: [],
            showNum: 15
        };

        $scope.bottom = {
            start: 0,
            bottom: [],
            showNum: 15
        };

        $scope.getItems = function () {
            $http({
                method: 'GET',
                url: '/api/itemsList'
            })
            .then(function (response) {
                $scope.itemsData = response.data;
                    
                // Construct Shopping Trips Chart
                $scope.shopsChart.series = ['Items per Trip'];
                $scope.shopsChart.data = [response.data.shops];
                var labels = [];
                for (var i = 1; i <= response.data.shops.length; i++) {
					if (i === response.data.shops.length) {
						labels.push('Current');
					}
					else {
						labels.push('Shop ' + i);
					}
                }
                $scope.shopsChart.labels = labels;
                    
                // Construct Shopping Items Pie
                for (var i = 0; i < response.data.items.length; i++) {
                    $scope.itemsPie.labels.push(response.data.items[i][0]);
                    $scope.itemsPie.data.push(response.data.items[i][1]);
                }
                $scope.itemsPie.toggleLegend(false);
                    
                // Construct Top 15
                $scope.top.top = $filter('limitTo')(response.data.items, $scope.top.showNum);
                $scope.top.total = response.data.items.length;
                    
                // Construct Last 15
                $scope.bottom.start = response.data.items.length - $scope.bottom.showNum - 1;
                $scope.bottom.bottom = $filter('limitTo')(response.data.items, $scope.bottom.showNum, $scope.bottom.start);
            },
            function () {});
        };

        $scope.getItems();
    }
]);