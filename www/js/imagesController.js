cerberusControllers.controller('ImagesController', [
    '$scope', '$http', '$window', function ($scope, $http, $window) {

      $scope.images = [];

      $scope.toMonth = (index) => {
        switch(index) {
          case 1: return 'January';
          case 2: return 'February';
          case 3: return 'March';
          case 4: return 'April';
          case 5: return 'May';
          case 6: return 'June';
          case 7: return 'July';
          case 8: return 'August';
          case 9: return 'September';
          case 10: return 'October';
          case 11: return 'November';
          case 12: return 'December';
          default: return '<Unknown/Corrupt>';
        }
      };

      $scope.openImage = (image) => {
        $window.open(image.location, '_blank');
      };

      let getImages = () => {
        $http({
            method: 'GET',
            url: '/api/images'
        })
        .then(function (data) {
          if (data.data.success) {
            $scope.images = data.data.images;
          }
        }, function () {});
      };

      getImages();
    }
]);
