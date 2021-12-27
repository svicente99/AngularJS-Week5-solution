(function () {
"use strict";

angular.module('public')
 .controller('SignupController', SignupController)
 .service('SignupService', SignupService);

SignupController.$inject = ['$scope', 'SignupService', 'ShareDataService', 'dishCategories'];
function SignupController($scope, SignupService, ShareDataService, dishCategories) {
  var form = this;
  form.dish_details = null;
  form.dish_type = '';
 
  form.setDetails = function (data) {
    form.dish_details = data;
  };
  form.getDetails = function () {
	return form.dish_details;
  }
  
  $scope.sign_up = function () {
	var dish = this.dish_user_info( $scope.dishPlate, $scope.dishCategory );
    var promise = SignupService.validate(dish, form.dish_type);

    promise
	  .then( function (response) {
		form.setDetails( response.data );
		console.log('dish details', form.getDetails());
		ShareDataService.setUserData( JSON.stringify($scope.form.user) );

		var arrDish = [form.dish_details.short_name,
                       form.dish_details.name];
		ShareDataService.setDishData( arrDish ); 
		 
		$scope.data_saved = true;
		$scope.dish_invalid = false;
	  })
	  .catch(function (error) {
		console.log("Something went terribly wrong...");
		ShareDataService.setDishData( "??" );
		$scope.data_saved = false;
		$scope.dish_invalid = true;
	  });
  };
  
  // https://stackoverflow.com/questions/42766564/placeholder-for-select-with-angularjs/42766773
  // answered Mar 13 '17 at 14:58
  $scope.dishCategories = dishCategories;
  $scope.dishCategory = "";   // = choose a category
  
  // $scope.dishCategories = [
        // {shortName : 'A', name : "Soup" },
        // {shortName : 'L', name : "Lunch"},
        // {shortName : 'B', name : "Appetizers"}
    // ];  
	
  /* it's necessary to fill short plate name OR choose dish category */
  $scope.form_valid = function (fields_required) {
	var ok = false;
	if (fields_required) {
		if ($scope.dishPlate != null || $scope.dishCategory != "") {
			ok = true;
		}
	}
	return ok;
  }
  
  /* if the user chose to digit short name that's the preference;
     otherwise, it use the category list selection;
	 it takes advantage and set the type of list to search in server
  */
  $scope.dish_user_info = function (plate_initials, short_category) {
	  if (plate_initials==null || plate_initials=="") {
		  form.dish_type = 'C';
	      return short_category;
	  } else {
		  form.dish_type = 'P';
		  return plate_initials;
	  }
  }
}


SignupService.$inject = ['ApiPath', '$http'];
function SignupService(ApiPath, $http) {
  var service = this;
  
  service.validate = function (userDish, plateOrCategory) {
	var dishShortName = userDish.toUpperCase();
	var search_list = (plateOrCategory==='P' ? 'menu_items/' : 'categories/');
	var response = $http({
			url: ApiPath + search_list + dishShortName+'.json',
			method: "GET",
		}).success(function(data, status) { 
			console.log("Data returned ");
		}).error(function(data, status) {
			console.log("Ohhh gotcha! Something terribly wrong happened...");
		});
	return response;
  };	

}

})();
