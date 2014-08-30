// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ui.router', 'linclark.serializer'])

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

        function($scope, $http) {
            $scope.userID = "";
            $scope.userPass = "";
           $scope.chkAuth = function(){

        $http({
            method: 'POST',
            url: 'http://staging.kauhsar.com/getLogin.php',
            data: {
                "userid" : $scope.userID,
                "password" : $scope.userPass

            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
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
                controller :
                    function($scope, $http) {
                        var user = document.getElementById('userid').innerText;
                        var pass = document.getElementById('password').innerText;
                        $scope.userID = $scope.userID;
                        $scope.userPass = $scope.userPass;
                        $scope.chkAuth = function(){
                                    alert($scope.userID);
                                    alert($scope.userPass);
                            $http({
                                method: 'POST',
                                url: 'http://staging.kauhsar.com/getLogin.php',
                                data: {
                                    "userid" : user,
                                    "password" : pass
                                    },
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).success(function(data){console.log(data)});
                        }
                    }
            })

            //nested list with custom controller
            .state('question', {
                url: '/questions/:id',
                templateUrl: 'views/questions.html',
                controller : 'questionsController'
            })

            .state('result', {
                url: '/result',
                templateUrl: 'views/examList.html'

            })
    });


 function questionsController($scope,$http,$stateParams,$rootScope){
     $rootScope.correctAnswers = 0;
     $scope.choice = 0;
     //$scope.correctAnswers = 0;
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

            if($scope.choice == $scope.variable[$scope.mark].correct) {
                $rootScope.correctAnswers++;
                //$scope.choice = 0;
            }
            document.getElementById(""+$scope.choice).checked = false;
            if($scope.mark == ($scope.variable.length-1)){ window.location.hash = "#/result";};
            $scope.mark++ ;

        };

     $scope.preQues = function (){

            $scope.mark-- ;
            if($scope.mark < 0){$scope.choice = 0;
                document.getElementById(""+$scope.choice).checked = false;
            }
            document.getElementById(""+$scope.choice).checked = true;
     };
    $scope.okay = function (lo) {
        if(lo == $scope.variable[$scope.mark].correct){
            $scope.choice = lo;
        }
    }
};