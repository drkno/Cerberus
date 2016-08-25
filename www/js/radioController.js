cerberusControllers.controller('RadioController', [
    '$scope', '$http', 'socket', function ($scope, $http, socket) {

      $scope.value = 25.34;
      $scope.sliderValue = 0;
      $scope.powerOn = false;

      $scope.togglePower = function() {
        $scope.powerOn = !$scope.powerOn;
      };

      $scope.muted = false;
      $scope.toggleMute = function() {
        $scope.muted = !$scope.muted;
        angular.element("#radioAudio").prop("muted",$scope.muted);
      };

      $scope.modeOptions = [
        "AM",
        "CW",
        "FM",
        "LSB",
        "USB",
        "WFM"
      ];

      $scope.filterOptions = [
        "3k",
        "6k",
        "15k",
        "50k",
        "230k"
      ];

      $scope.toneSquelchOptions = [
        "Off",
        "67.0 Hz",
        "69.3 Hz",
        "71.0 Hz",
        "71.9 Hz",
        "74.4 Hz",
        "77.0 Hz",
        "79.7 Hz",
        "82.5 Hz",
        "85.4 Hz",
        "88.5 Hz",
        "91.5 Hz",
        "94.8 Hz",
        "97.4 Hz",
        "100.0 Hz",
        "103.5 Hz",
        "107.2 Hz",
        "110.9 Hz",
        "114.8 Hz",
        "118.8 Hz",
        "123.0 Hz",
        "127.3 Hz",
        "131.8 Hz",
        "136.5 Hz",
        "141.3 Hz",
        "146.2 Hz",
        "151.4 Hz",
        "156.7 Hz",
        "159.8 Hz",
        "162.2 Hz",
        "165.5 Hz",
        "167.9 Hz",
        "171.3 Hz",
        "173.8 Hz",
        "177.3 Hz",
        "179.9 Hz",
        "183.5 Hz",
        "186.2 Hz",
        "189.9 Hz",
        "192.8 Hz",
        "196.6 Hz",
        "199.5 Hz",
        "203.5 Hz",
        "206.5 Hz",
        "210.7 Hz",
        "218.1 Hz",
        "225.7 Hz",
        "229.1 Hz",
        "233.6 Hz",
        "241.8 Hz",
        "250.3 Hz",
        "254.1 Hz"
      ];

    }
]);
