angular.module('bolao')
  .factory('Conta', function($http) {
    return {
      getPerfil: function() {
        return $http.get('https://www.googleapis.com/oauth2/v1/userinfo');
      }
    };
  });


//   $http.get('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + params.access_token)
    //                 .success(function(user) {
    //                     //$rootScope.$apply(function() {
    //                     user.accessToken = params.access_token;
    //                     Token.set(JSON.stringify(user));
    //                     //});
    //                 }
    //                 );