const { SoapServer } = require('soap-server');
const { register, recharge, payment, confirm, balance } = require('./controler');
const dotenv = require('dotenv')

dotenv.config();

function ResponseObj (){}
ResponseObj.prototype.error = false
ResponseObj.prototype.msg = ''
ResponseObj.prototype.value = 0;

function WalletService (){}

WalletService.prototype.WalletService = function (typeOp, data){
	console.log('estoy en la funcion correcta', typeOp, data)
	const resp = new ResponseObj();
	const json = JSON.parse(data);
	let response = {}
	switch(typeOp){
		case 'register': 
			response = register(json, resp)
			break;
		case 'recharge': 
			response = recharge(json, resp)
			break;
		case 'payment': 
			response = payment(json, resp)
			break;
		case 'confirm': 
			response = confirm(json, resp)
			break;
		case 'balance': 
			response = balance(json, resp)
			break;
		default:
				resp.error = true;
				resp.msg = 'invalid operation';
	}
	return resp;
};

const soapServer = new SoapServer();
const soapService = soapServer.addService('wallet', new WalletService());

const operation = soapService.getOperation('WalletService');
operation.setOutputType(ResponseObj, 'ResponseObj');
operation.setInputType('typeOp', {type: 'string'});
operation.setInputType('data', {type: 'string'});

soapServer.listen(process.env.PORT || 1337, process.env.HOST || '127.0.0.1', () => console.log('server soap is running'));
