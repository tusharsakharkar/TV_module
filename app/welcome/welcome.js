'use strict';
angular.module('EnoticeBoardWebApp.welcome', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html'
        , controller: 'WelcomeCtrl'
    });
}]).controller('WelcomeCtrl', ['$scope', '$timeout', '$firebaseAuth', '$sce', 'CommonProp', '$firebaseArray', function ($scope, $timeout, $firebaseAuth, $sce, CommonProp, $firebaseArray) {
    //var timeint = 100;
    var te = firebase.database().ref().child('posts').child('CSE').child('Approved').orderByChild('type').equalTo(3);
    $scope.testpdf = $firebaseArray(te);
    var auth = $firebaseAuth();
    var userId = firebase.auth().currentUser.uid;
    console.log("djdjdjd" + userId);
    $scope.depth;
    var Department;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var reff = firebase.database().ref('/Users/' + userId).once('value').then(function (snapshot) {
                Department = snapshot.val().department;
                // name = snapshot.val().name;
                $scope.depth = Department; //Department
                $scope.name = name; //username
                $scope.block = snapshot.val().block; //username
                var Level = snapshot.val().level;
                console.log($scope.depth);
                console.log($scope.name);
                var ref123 = firebase.database().ref().child('posts').child(Department).child('Approved').orderByChild("servertime");
                $scope.articles123 = $firebaseArray(ref123);
                // var block = snapshot.val().block;
                $scope.trustSrc = function (src) {
                    return $sce.trustAsResourceUrl(src);
                };
                setInterval(function () {
                    var ref = firebase.database().ref().child('posts').child(Department).child('Approved').orderByChild("servertime");
                    $scope.articles = $firebaseArray(ref);
                    $scope.articles.$loaded().then(function () {
                        var pictime = 60000 / $scope.articles.length;
                        //console.log($scope.articles.length);
                        let promise = $timeout();
                        angular.forEach($scope.articles, function (art) {
                            promise = promise.then(function () {
                                $scope.artt = art;
                                return $timeout(pictime);
                            });
                        })
                    });
                    //dispfun();
                    /*
                    for (var i = 0; i < 10; i++) {
                        console.log(i);
                    }
                    */
                    //timeint = $scope.articles.length * 5000;
                }, 180000);
            });
        }
        else {
            alert("please sign in");
        }
    });
    console.log("sdnslnfnsf" + Department);
    const ref1 = firebase.database().ref().child('posts').child('CSE').child('Deptposts').orderByChild("approved").equalTo("false");
    $scope.test = $firebaseArray(ref1);
    $scope.logout = function () {
        console.log("DJDJDJJDJ");
        CommonProp.logoutUser();
    }
}])