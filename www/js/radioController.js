cerberusControllers.controller('RadioController', ['$scope', '$http', 'socket', function ($scope, $http, socket) {

      $scope.settings = {
        power: false,
        mode: 'AM',
        filter: '3k',
        toneSquelch: 'Off',
        afGain: 50,
        squelch: 50,
        noiseBlank: false,
        frequency: 10000000
      };

      $scope.signalStrength = 0;  

      //#region power
      $scope.power = $scope.settings.power;
      $scope.togglePower = () => {
          $scope.settings.power = !$scope.settings.power;
          $scope.power = $scope.settings.power;
          socket.emit('power', { power: $scope.settings.power });
      };
        
      socket.on('power', (data) => {
          $scope.settings.power = data.power;
          $scope.power = data.power;
      });
      //#endregion power

      //#region mode
      $scope.modeOptions = [
        "AM",
        "CW",
        "FM",
        "LSB",
        "USB",
        "WFM"
      ];

      $scope.modeChange = () => {
          socket.emit('mode', { mode: $scope.settings.mode });
      };
      
      socket.on('mode', (data) => {
          $scope.settings.mode = data.mode;
      });
      //#endregion mode

      //#region AF Gain
      $scope.afGainChange = () => {
          socket.emit('afGain', { afGain: $scope.settings.afGain });
      };

      socket.on('afGain', (data) => {
          $scope.settings.afGain = data.afGain;
      });
      //#endregion AF Gain

      //#region filter
      $scope.filterOptions = [
        "3k",
        "6k",
        "15k",
        "50k",
        "230k"
      ];

      $scope.filterChange = () => {
          socket.emit('filter', { filter: $scope.settings.filter });
      };

      socket.on('filter', (data) => {
          $scope.settings.filter = data.filter;
      });
      //#endregion filter

      //#region squelch
      $scope.squelchChange = () => {
          socket.emit('squelch', { squelch: $scope.settings.squelch });
      };

      socket.on('squelch', (data) => {
          $scope.settings.squelch = data.squelch;
      });
      //#endregion

      //#region tone squelch
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

      $scope.toneSquelchChange = () => {
          socket.emit('toneSquelch', { toneSquelch: $scope.settings.toneSquelch });
      };

      socket.on('toneSquelch', (data) => {
          $scope.settings.toneSquelch = data.toneSquelch;
      });
      //#endregion

      //#region noise blank
      $scope.noiseBlankChange = () => {
          socket.emit('noiseBlank', { noiseBlank: $scope.settings.noiseBlank });
      };

      socket.on('noiseBlank', (data) => {
          $scope.settings.noiseBlank = data.noiseBlank;
      });
      //#endregion

      //#region frequency

      let lcdOn = angular.element('<div class="lcdOn"></div>').css("color"),
          lcdOff = angular.element('<div class="lcdOff"></div>').css("color"),
          lcdFrequency = new SegmentDisplay("lcdFrequency");

      lcdFrequency.pattern = "###.###.###.###";
      lcdFrequency.intMin = 0;
      lcdFrequency.intMax = 999999999999;
      lcdFrequency.colorOn = lcdOn;
      lcdFrequency.colorOff = lcdOff;

      lcdFrequency.onValueChanged = (value) => {
          $scope.settings.frequency = value;
          socket.emit('frequency', { frequency: value });
      };

      lcdFrequency.setIntValue($scope.settings.frequency);
      lcdFrequency.enableMouse();

      socket.on('frequency', (data) => {
          lcdFrequency.setIntValue(data.frequency);
          $scope.settings.frequency = data.frequency;
      });

      //#endregion

      //#region current
      socket.on('current', (data) => {
          $scope.settings = data;
          $scope.power = data.power;
      });

      socket.emit('current');
      //#endregion

      //#region mute
      $scope.muted = false;

      $scope.toggleMute = () => {
          $scope.muted = !$scope.muted;
          angular.element("#radioAudio").prop("muted",$scope.muted);
      };
      //#endregion

      //#region signal
      socket.on('signal', (data) => {
          $scope.signalStrength = (data.signal * 100.0).toFixed();
      });
      //#endregion

    }
]);
