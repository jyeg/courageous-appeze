'use strict';
angular.module('antiSocialite.services', ['http-auth-interceptor', 'config'])

	//.factory('Auth', function ($http, $location, $window, $state, $q, localStorageService) {
	//	// Don't touch this Auth service!!!
	//	// it is responsible for authenticating our user
	//	// by exchanging the user's username and password
	//	// for a JWT from the server
	//	// that JWT is then stored in localStorage as 'com.shortly'
	//	// after you signin/signup open devtools, click resources,
	//	// then localStorage and you'll see your token from the server
	//	var signin = function (user) {
	//		return $http({
	//			method: 'POST',
	//			url: '/api/users/signin',
	//			data: user
	//		})
	//			.then(function (resp) {
	//				$http.defaults.headers.common['x-access-token'] = resp.data.token;
	//			});
	//	};
	//
	//	var signup = function (user) {
	//		return $http({
	//			method: 'POST',
	//			url: '/api/users/signup',
	//			data: user
	//		})
	//			.then(function (resp) {
	//				return resp.data.token;
	//			});
	//	};
	//
	//	var isAuth = function () {
	//		console.log(localStorageService.getItem('courageousTrapeze'));
	//		return !!localStorageService.getItem('courageousTrapeze');
	//	};
	//
	//	var signout = function () {
	//		localStorageService.removeItem('courageousTrapeze');
	//		delete $http.defaults.headers.common['x-access-token'];
	//		$location.path('/signin');
	//	};
	//
	//
	//	return {
	//		//userId: null,
	//		signin: signin,
	//		signup: signup,
	//		isAuth: isAuth,
	//		signout: signout
	//
	//	};
	//
	//
	//})
//.factory('AuthFactory', function ($http, $state, $q) {
//		var factory = {
//			userId: null,
//			 userName: null,
//			 githubAvatarUrl: null,
//			isLoggedIn: isLoggedIn,
//			getUserName: getUserName
//		};
//
//		return factory;
//
//		function isLoggedIn(redirectToLogin) {
//			console.log("in auth factory");
//			return $http.post('http://a811eaa4.ngrok.io/api/users/signin', {'username':'test', 'password': 'test'})
//				.then(function (res) {
//					factory.userId = res.data.userId;
//					factory.userName = res.data.userName;
//					factory.githubAvatarUrl = res.data.githubAvatarUrl;
//					if (res.data.userId === null) {
//						if (redirectToLogin !== false) {
//							console.log('should go to login state');
//							return $state.go('login');
//						}
//						return false;
//					}
//					return {
//						'userName': factory.userName,
//						'userId': factory.userId,
//						'githubAvatarUrl': factory.githubAvatarUrl,
//					};
//				});
//		}
//
//		function getUserName() {
//			if (factory.userName === undefined) {
//				return factory.isLoggedIn();
//			} else {
//				return $q.when({
//					'userName': factory.userName,
//					'userId': factory.userId,
//					'githubAvatarUrl': factory.githubAvatarUrl
//				});
//			}
//		}
//
//
//})

//.factory('AuthenticationService', function($rootScope, $http, authService, localStorageService) {
//	var service = {
//		login: function(user) {
//			$http.post('https://courageoustrapeze.azurewebsites.net/api/users/signin', { user: user }, { ignoreAuthModule: true })
//				.success(function (data, status, headers, config) {
//
//					$http.defaults.headers.common.Authorization = data.authorizationToken;  // Step 1
//
//					// Need to inform the http-auth-interceptor that
//					// the user has logged in successfully.  To do this, we pass in a function that
//					// will configure the request headers with the authorization token so
//					// previously failed requests(aka with status == 401) will be resent with the
//					// authorization token placed in the header
//					authService.loginConfirmed(data, function(config) {  // Step 2 & 3
//						config.headers.Authorization = data.authorizationToken;
//						localStorageService.set('courageousTrapeze', data.authorizationToken);
//						return config;
//					});
//				})
//				.error(function (data, status, headers, config) {
//					$rootScope.$broadcast('event:auth-login-failed', status);
//				});
//		},
//		logout: function(user) {
//			$http.post('https://logout', {}, { ignoreAuthModule: true })
//				.finally(function(data) {
//					localStorageService.remove('courageousTrapeze');
//					delete $http.defaults.headers.common.Authorization;
//					$rootScope.$broadcast('event:auth-logout-complete');
//				});
//		},
//		loginCancelled: function() {
//			authService.loginCancelled();
//		}
//	};
//	return service;
//})
	.factory('Contacts', function($http) {

 	  var selected = [];

		var getAllContacts = function() {
			return $http({
				method: 'GET',
				url: 'http://a811eaa4.ngrok.io/api/contacts'
			})
			.success(function(response) {
				return response.data;
			})
			.error(function(err){
				console.error("cannot get all contacts", err)
			});
  	};

  	var selectedContacts = function(contact) {
  		// console.log("inside of selectedContacts")
  		// console.log("contact", contact)
  		if(selected.length === 0){
      	selected.push(contact);
      	console.log("selected", selected)
  		} else {
	  		for(var i = 0; i < selected.length; i++){
		  		if (selected[i].phone === contact.phone){
		  			selected.splice(i, 1);
		  			return;
	      	} else if (selected[i].phone !== contact.phone){
	      		selected.push(contact);
	      		// console.log("not selected", contact)
	      		// console.log(selected)
	      		return
	     		}
  			}
    	}
  	}

  	// var selectedContacts = function(contact) {
  	// 	for(var i = 0; i < selected.length; i++){
	  // 		if (selected[i].phone !== contact.phone){
   //    		selected.push(contact);
	  //     	console.log("selected", contact)
	  //     	console.log(selected)

  	// 		} else {
	  //     	console.log("not selected", contact)
	  //     	console.log(selected)
   //    		selected.splice(i, 1);
  	// 		}
   //    }
   //  }

    var recipients = function(){
    	return selected;
    }

    var checkedContacts = function(contact){
    	for(var i = 0; i < selected.length; i ++){
				if(selected[i].phone === contact.phone){
					console.log("i'm true!!!");
					return true;
				}
			}
    }

  	return {

  		getAllContacts: getAllContacts,
  		selectedContacts: selectedContacts,
  		recipients: recipients,
  		checkedContacts: checkedContacts
  	}
	})

	.factory('Messages', function ($http) {

			// var data = {
			// 	userId: 'jmyeg',
			// 	messages:[{
			// 		id:1,
			// 		contactId:'2',
			// 		contactPhone:'8046831201',
			// 		text: 'im not a robot, im just antisocialite!',
			// 		date:'2015-05-01'
			// 	},{
			// 		id:2,
			// 		contactId:'3',
			// 		contactPhone:'9254870772',
			// 		text: 'im not a robot, im just an antisocialite!',
			// 		date:'2015-05-01'
			// 	},{
			// 		id:3,
			// 		contactId:'2',
			// 		contactPhone:'8046831652',
			// 		text: 'im not a robot, im just antisocialite!',
			// 		date:'2015-05-01'
			// 	}
			// 	]
			// };
		var getMessages = function () {
			console.log("inside of get messages")
				return $http({
				method: 'GET',
				url: 'http://a811eaa4.ngrok.io/api/messages'
			})
			.success(function(response) {
				// alert(JSON.stringify(response.data));
				return response;
			})
			.error(function(err){
			console.error("cannot get all messages", err)
			});
		};


		var updateMessage = function(message){
			$http({
				method: 'POST',
				url: 'http://a811eaa4.ngrok.io/api/messages',
				data: message
			});
		};

		var deleteMessage = function(message){
			//data.messages.splice(data.messages.indexOf(message),1);
			$http({
				method: 'DELETE',
				url: 'http://a811eaa4.ngrok.io/api/messages',
				data: message.id
			});
		};

		return {
			getMessages: getMessages,
			update: updateMessage,
			remove: deleteMessage
		};


	})

.factory('AttachTokens', ['$window', function($window, localStorageServiceProvider) {
	// this is an $httpInterceptor
	// its job is to stop all out going request
	// then look in localStorage and find the user's token
	// then add it to the header so the server can validate the request
	var attach = {
		request: function(object) {
			var jwt = localStorageServiceProvider.getItem('courageousTrapeze');
			if (jwt) {
				object.headers['x-access-token'] = jwt;
			}
			return object;
		}
	};
	return attach;
}]);
