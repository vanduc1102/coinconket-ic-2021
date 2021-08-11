import { InjectedConnector } from '@web3-react/injected-connector';
import { BSC_TestNet } from './chainList';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, BSC_TestNet.id],
});
