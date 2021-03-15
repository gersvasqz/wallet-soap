const soap = require('soap');
const fs = require('fs');
const http = require('http');
const controller = require('./controler')

var walletSerivce = {
	MyWalletService: {
		Wallet: {
			register: function (args1, args2) {
				console.log(args1, typeof args1);
				return args1
				// const { operation, data } = JSON.parse(args)
				// return controller(operation, data);
			},
			recharge: function (args1, args2) {
				console.log('estoy en recarge', args1, typeof args1);
				return args1
				// const { operation, data } = JSON.parse(args)
				// return controller(operation, data);
			},
			payment: function (args1, args2) {
				console.log('estoy en recarge', args1, typeof args1);
				return args1
				// const { operation, data } = JSON.parse(args)
				// return controller(operation, data);
			},
			confirm: function (args1, args2) {
				console.log('estoy en recarge', args1, typeof args1);
				return args1
				// const { operation, data } = JSON.parse(args)
				// return controller(operation, data);
			},
			balance: function (args1, args2) {
				console.log('estoy en recarge', args1, typeof args1);
				return args1
				// const { operation, data } = JSON.parse(args)
				// return controller(operation, data);
			},
		}
	}
};

const xml = fs.readFileSync('src/wallet.wsdl', 'utf8');

//http server example
var server = http.createServer(function (request, response) {
	// console.log('aqui', request.method)
	response.end('404: Not Found: ' + request.url);
});

server.listen(8000);
soap.listen(server, '/wallet', walletSerivce, xml, function () {
	console.log('server initialized');
});