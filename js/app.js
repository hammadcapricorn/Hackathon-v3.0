// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ui.router'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('loginController',

    function($scope){

    })

    .controller('questionsController',

    function($scope, $http){
        $http.get('http://staging.kauhsar.com/getquestion.php').success(function(data){
            $scope.variable = data;
            console.log(data);

        })
            .error(function(data){
                $scope.variable = data;
                alert('ERROR')
            });

    })

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider

            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                templateUrl: 'views/login.html',
                controller : function ($scope){}
            })

            //nested list with custom controller
            .state('question', {
                url: '/questions/:id',
                templateUrl: 'views/questions.html',
                controller : questionsController
            })
    });


 function questionsController($scope, $http,$stateParams){

     $scope.correctAnswers = 0;
     $scope.QuesionsData = $http.get('http://staging.kauhsar.com/getquestion.php')
         .success(function(data){
            $scope.variable = data;
            console.log(data);
            return data;
         })
        .error(function(data){
            $scope.variable = data;
            alert('ERROR')
        });

        $scope.mark = $stateParams.id = 0;

        $scope.nextQues = function (){
            $scope.mark++ ;
        };

        $scope.preQues = function (){
        $scope.mark-- ;
        };
    $scope.okay = function (lo) {
        if(lo == $scope.variable[$scope.mark].correct){

            $scope.mark++ ;
        }
    }
};