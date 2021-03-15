import { listen } from 'soap';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { config } from 'dotenv'
import controller from './controler';
import './database';

config();

const walletService = {
  MyWalletService: {
    Wallet: controller,
  },
};
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '127.0.0.1';
const xmlFile = readFileSync('src/wallet.wsdl', 'utf8');

const xml = xmlFile.replace(/URL\b/g, `${HOST}:${PORT}`)
const server = createServer();


server.listen(8000);
listen(server, '/wallet', walletService, xml, () => {
  console.info('server initialized');
});
