angular.module('starter.controllers', ['SwampDragonServices'])

.controller('DashCtrl', function($scope,$ionicPopup, $http,$q,$dragon) {
        $scope.channel = 'swampy-channel';
        $dragon.onReady(function(){
            console.log('hit');
            $dragon.subscribe('locationcurrent', $scope.channel, {});
            $dragon.getSingle('locationcurrent', {user: 1}).then(function (response) {
                var userLocationData = response.data;
                $scope.myLocation = new google.maps.LatLng(userLocationData.latitude, userLocationData.longitude);
                var mapOptions = {
                    zoom: 14,
                    center: $scope.myLocation,
                    mapTypeId: google.maps.MapTypeId.TERRAIN
            };
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                new google.maps.Marker({
                        map: $scope.map,
                        position: $scope.myLocation
                });

            });
        })
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
