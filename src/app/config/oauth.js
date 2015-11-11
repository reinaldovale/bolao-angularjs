angular.module("bolao")
.config(function($authProvider) {
    $authProvider.google({
        clientId: '1041203641186-p7ift3msto8too87sqtkbq3so9j6qcp0.apps.googleusercontent.com',
        responseType: 'token'
    });
});
