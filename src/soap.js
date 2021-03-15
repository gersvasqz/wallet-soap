const soap = require('soap');
const fs = require('fs');
const http = require('http');
const controller = require('./controler')
const DB = require('./database');

const walletService =  {
	MyWalletService: {
		Wallet: controller 
	}
}
const xml = fs.readFileSync('src/wallet.wsdl', 'utf8');

//http server example
var server = http.createServer(function (request, response) {
	response.end('404: Not Found: ' + request.url);
});

server.listen(8000);
soap.listen(server, '/wallet', walletService, xml, function () {
	DB.connection
	console.log('server initialized');
});