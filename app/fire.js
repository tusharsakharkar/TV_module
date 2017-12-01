(function(){
 var config = {
    apiKey: "AIzaSyBzPKX2mUYNRRcRsYwxIEUbuW7hLX-tP_Q",
    authDomain: "e-notice-board-83d16.firebaseapp.com",
    databaseURL: "https://e-notice-board-83d16.firebaseio.com",
    storageBucket: "e-notice-board-83d16.appspot.com",
    messagingSenderId: "998245420612"
  };
  firebase.initializeApp(config);

angular
.module('app',['firebase'])
.controller('MyCtrl',function($firebaseObject){
	const ref =  firebase.database().ref().child('posts').child('CSE').child('Deptposts');
  this.object =  $firebaseObject(ref);
}); 
}());