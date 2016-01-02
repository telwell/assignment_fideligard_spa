app.service('date', 
	['$http', function($http){

	var info = {
		date: ''
	};

	var getInfo = function(){
		return info;
	}

	var dateSet = function(newDate){
		info.date = new Date(newDate).getTime();
	}

  return {
  	dateSet: dateSet, 
  	getInfo: getInfo
  }

}]);