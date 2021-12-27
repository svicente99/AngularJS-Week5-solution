(function () {
"use strict";

angular.module('public')
 .controller('MyinfoController', MyinfoController);

MyinfoController.$inject = ['$scope','ShareDataService','MyInfoService'];
function MyinfoController($scope, ShareDataService, MyInfoService) {
  
  var user_registered = false;
  var user_data = ShareDataService.getUserData();
  
  if( user_data!=="" ) {
	  user_registered = true;

	  var info = JSON.parse(user_data);
	  $scope.first_name = info.firstname;
	  $scope.last_name = info.lastname;
	  $scope.e_mail = info.email;
      $scope.phone = info.phone;
	  
	  var arrDish = ShareDataService.getDishData();
	  const INITIALS = 0, NAME = 1;
	  $scope.dish_initials = arrDish[INITIALS];
	  $scope.dish_name = arrDish[NAME];
	  let category  = $scope.dish_initials.replace(/[0-9]/g,'');
	  $scope.dish_image = MyInfoService.getImageDish(category);
  }
  
  $scope.isRegistered = function () {
	  console.log("user is registered? ", user_registered);
	  return user_registered;
  }
}

})();
