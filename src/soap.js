const soap = require('soap');
const fs = require('fs');
const http = require('http');

var myService = {
	MyService: {
			MyPort: {
					MyFunction: function(args) {
							return {
									name: args.name
							};
					},

					// This is how to define an asynchronous function with a callback.
					MyAsyncFunction: function(args, callback) {
							// do some work
							callback({
									name: args.name
							});
					},

					// This is how to define an asynchronous function with a Promise.
					MyPromiseFunction: function(args) {
							return new Promise((resolve) => {
								// do some work
								resolve({
									name: args.name
								});
							});
					},

					// This is how to receive incoming headers
					HeadersAwareFunction: function(args, cb, headers) {
							return {
									name: headers.Token
							};
					},

					// You can also inspect the original `req`
					reallyDetailedFunction: function(args, cb, headers, req) {
							console.log('SOAP `reallyDetailedFunction` request from ' + req.connection.remoteAddress);
							return {
									name: headers.Token
							};
					}
			}
	}
};

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

//http server example
var server = http.createServer(function(request,response) {
	response.end('404: Not Found: ' + request.url);
});

server.listen(8000);
soap.listen(server, '/wsdl', myService, xml, function(){
console.log('server initialized');
});
