//Generic service for calling API
angular.module('APIModule', []).factory('APIService', ['$http', function($http) {
    return {
        getData: function(obj){
            var xhr = $http({
                url: obj.req_url,
                method: 'GET',
                data: obj.data,
                headers: {'Content-Type': 'application/json'}
            });
            return xhr;
        },
        setData: function(obj){
            var xhr = $http({
                url: obj.req_url,
                method: 'POST',
                data: obj.data,
                headers: {'Content-Type': 'application/json'}
            });
            return xhr;
        },
        removeData: function(obj){
            var xhr = $http({
                url: obj.req_url,
                method: 'DELETE',
                data: obj.data,
                headers: {'Content-Type': 'application/json'}
            });
            return xhr;
        },
        updateData: function(obj){
            var xhr = $http({
                url: obj.req_url,
                method: 'PUT',
                data: obj.data,
                headers: {'Content-Type': 'application/json'}
            });
            return xhr;
        }
    };
}]);