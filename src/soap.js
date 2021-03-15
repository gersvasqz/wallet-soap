const soap = require('soap');
const fs = require('fs');
const http = require('http');
const controller = require('./controler')

var myService = {
	MyService: {
		MyServicePort: {
				MyOperation: function(args) {
						const { operation, data } = JSON.parse(args)
						return controller(operation, data);
					},
			}
	}
};

const xml = fs.readFileSync('myservice.wsdl', 'utf8');

//http server example
var server = http.createServer(function(request,response) {
	// console.log('aqui', request.method)
	response.end('404: Not Found: ' + request.url);
});

server.listen(8000);
soap.listen(server, '/wsdl', myService, xml, function(){
console.log('server initialized');
});