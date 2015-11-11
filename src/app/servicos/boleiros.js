angular.module('bolao')
  .factory('Boleiros', function($http) {
    return {
      getPerfil: function() {
        return $http.get('https://www.googleapis.com/oauth2/v1/userinfo');
      }
    };
  });
