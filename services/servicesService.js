(function(){
    angular.module('nashhelps')
        .factory('servicesService', servicesService);
    
    servicesService.$inject = ['$http', 'api'];

    function servicesService($http, api){
        var servicesApi = api.baseUrl + 'services/';

        function getServices() {
            return $http.get(servicesApi)
                .then(function(res){
                    return res.data;
                });
        }

        function getCategories() {
            return getServices()
                .then(function(res){
                    var data = res;
                    data = data.map(function(value, index, array){
                        return value.category;
                    });
                    data = data.filter(function(value, index, array){
                        return data.indexOf(value) == index;
                    })    
                    return data; 
                });                   
        }

        function addService(service){
            return $http.post(servicesApi, service)
                .then(
                    function(res){
                        return res.data;
                    }
                )
        }

        function deleteService(serviceId){
            return $http.delete(servicesApi + serviceId)
                .then(
                    function(res){
                        return res.data;
                    }
                )
        }

        return {
            getServices: getServices,
            getCategories: getCategories,
            addService: addService,
            deleteService: deleteService
        }
    }

})();
