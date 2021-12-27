(function () {
"use strict";

angular.module('public')
 .constant('ImagesPath', './images/menu/')
 .service('MyInfoService', MyInfoService);


MyInfoService.$inject = ['ImagesPath'];
function MyInfoService(ImagesPath) {
  var service = this;
  
  service.getImageDish = function (dish_initials) {
	return ImagesPath + dish_initials + '/' + dish_initials + '.jpg';
  };	

}

})();
