const soap = require('soap');
const fs = require('fs');
const http = require('http');
const { register, recharge, payment, confirm, balance } = require('./controler');

const WalletService = function (args){
	console.log('estoy en la funcion correcta', args)
	const json = JSON.parse(data);
	let resp = {}
	switch(json.operation){
		case 'register': 
			resp = register(json, resp)
			break;
		case 'recharge': 
			resp = recharge(json, resp)
			break;
		case 'payment': 
			resp = payment(json, resp)
			break;
		case 'confirm': 
			resp = confirm(json, resp)
			break;
		case 'balance': 
			resp = balance(json, resp)
			break;
		default:
				resp.error = true;
				resp.msg = 'invalid operation';
	}
	return resp;
};

const WalletService = { WalletService: { MyPort: { WalletService } } }

const xml = fs.readFileSync('WalletService.wsdl', 'utf8');

const server = http.createServer(() => console.log('Server soap is running'));

server.listen(8000);
soap.listen(server, '/wsdl', WalletService, xml, function(){
	console.log('server initialized');
});