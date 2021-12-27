(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://svicente99-assign5.herokuapp.com/')
.service('ShareDataService', ShareDataService)
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

function ShareDataService() {
  var service = this;
  var user_data = "";	
  var dish_name = "";
	
  service.setUserData = function (user_data_saved) {
    user_data = user_data_saved;
  };

  service.getUserData = function() {
    return user_data;
  };
  
  service.setDishData = function (dish_short_name) {
	dish_name = dish_short_name;
  }

  service.getDishData = function() {
    return dish_name;
  };
  
}



})();
