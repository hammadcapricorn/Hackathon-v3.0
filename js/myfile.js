/**
 * Created by WarChief on 8/25/2014.
 */


angular.module('myApp',[])

.controller('loginController',

    function($scope){

    })

.controller('menuController',
    function($scope){

    })
    .controller('questionController',
    function($scope,$routeParams){

    })

//.config(
//    function($routeProvider){
//        $routeProvider
//            .when('#/',
//            {
//                templateUrl : "views/login.html",
//                controller : 'loginController'
//            })
//            .when('#/examMenu',
//            {
//                templateUrl : "views/examList.html",
//                controller : 'menuController'
//            })
//            .when('#/questions',
//            {
//                templateUrl : "views/questions.html",
//                controller : 'menuController'
//            })
//            .when('#/questions/:id',
//            {
//                templateUrl : "views/questions.html",
//                controller : 'menuController'
//            })
//    });