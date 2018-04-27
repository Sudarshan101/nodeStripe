// Ionic Starter App
Stripe.setPublishableKey("****************************");
angular.module('NodeStripe', ['ionic', 'CheckOut.controllers', 'APIModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() { 
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.directive('stripeForm', ['$window',
   function($window) {
       var directive = { restrict: 'A' };
       directive.link = function(scope, element, attributes) {
           var form = angular.element(element);
           form.bind('submit', function() {
               var button = form.find('button');
               button.prop('disabled', true);
               $window.Stripe.createToken(form[0], function() {
                   button.prop('disabled', false);
                   var args = arguments;
                   scope.$apply(function() {
                       scope.$eval(attributes.stripeForm).apply(scope, args);
                   });
               });
           });
       };
       return directive;
   }
])

.config(function($stateProvider, $urlRouterProvider) {


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
 
  .state('checkout', {
    url: '/checkout',
    cache: false,
    templateUrl: 'templates/checkout.html',
    controller: 'CheckOutCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/welcome');
  $urlRouterProvider.otherwise('/checkout');

});
