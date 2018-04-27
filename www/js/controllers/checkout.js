angular.module('CheckOut.controllers', [])

.controller('CheckOutCtrl', function($scope, $ionicModal, $state, $ionicSlideBoxDelegate, $ionicPopup,  $ionicLoading, APIService) {
 	$scope.remeber = true;	
	$scope.sforms={};
	$scope.sforms.name = "CodeSolution";
	$scope.sforms.month = "08";	
	$scope.sforms.creditcard = "4242424242424242";
	$scope.sforms.year = "2018";
	$scope.sforms.cvv ="123";
	$scope.sforms.amount = "20000"; //usd 200
	$scope.sforms.user_email = "info@codesolution.co.in";
	console.log($scope.sforms);
	var id = 1;

	$scope.range = function(min, max, step){
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
    };
    // $scope.range();

	$scope.checkvalid = function(){
	var Name = $scope.sforms.name;
	var MOnth = $scope.sforms.month;
	var Card = $scope.sforms.creditcard;
	var Year = $scope.sforms.year;
	var Cvv = $scope.sforms.cvv;
	if(Name==""){
		$scope.showAlert("Message", "Name is required");
		return false;
	}
	if(Card==""){
		$scope.showAlert("Message","Card Number is required");
		return false;
	}
	if(MOnth==""){
		$scope.showAlert("Message","Month is required");
		return false;
	}
	if(Year==""){
		$scope.showAlert("Message","Year is required");
		return false;
	}
	if(Cvv==""){
		$scope.showAlert("Message","Cvv is required");
		return false;
	}
	$scope.saveCustomer = function(status, response){
		console.log(response.id);
		var TokenID = response.id;
		if(TokenID==undefined || TokenID==null){
			var alertPopup = $ionicPopup.alert({
				title: '<h5 class="text-center">Enter a valid card number</h5>',
				template: ''
			});
			alertPopup.then(function(res) {
				console.log('');
			});
			return false;
		}
		$scope.sforms.token = TokenID;
		$ionicLoading.show();
		APIService.setData({
			req_url: 'http://localhost:3000/api/checkout',
			data: $scope.sforms
		}).then(function(resp) {
			$ionicLoading.hide();
			console.log(resp.data);
			if(resp.data.payment.status=="succeeded"){
				var alertPopup = $ionicPopup.alert({
					title: '<h5 class="text-center">'+resp.data.payment.outcome.seller_message+'</h5>',
					template: ''
				});
				alertPopup.then(function(res) {
					console.log(res);
				});

			}else{
				var alertPopup = $ionicPopup.alert({
					title: '<h5 class="text-center">Payment failed.</h5>',
					template: ''
				});
				alertPopup.then(function(res) {

				});
			}
		},function(resp) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: '<h5 class="text-center">Something went wrong please try again later</h5>',
				template: ''
			});
			alertPopup.then(function(res) {
				console.log('');
			});
		});
		};
	}

	$scope.remberUncheck = function(){
		if($scope.remeber == false){
			$scope.remeber = true;
		}
	}
})