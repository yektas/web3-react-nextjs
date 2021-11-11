import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

const RPC_URL_1 =
  "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213";
const RPC_URL_4 =
  "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213";

const RPC_URLS = {
  1: RPC_URL_1,
  4: RPC_URL_4,
};

export const walletConnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  qrcode: true,
});
