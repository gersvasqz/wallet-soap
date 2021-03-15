import { listen } from 'soap';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import controller from './controler';
import './database';

const walletService = {
  MyWalletService: {
    Wallet: controller,
  },
};
const xml = readFileSync('src/wallet.wsdl', 'utf8');

const server = createServer();

server.listen(8000);
listen(server, '/wallet', walletService, xml, () => {
  console.info('server initialized');
});
