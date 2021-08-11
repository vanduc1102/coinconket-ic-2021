import React, { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Button, Chip, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useConfirm } from 'material-ui-confirm';

import { injected } from '../../../configurations/connectors';
import { BSC_TestNet, ChainList } from '../../../configurations/chainList';
import { useLoginButtonStyles } from './style';

const LoginButton: React.FC = () => {
  const confirm = useConfirm();
  const { active, activate, deactivate, account, chainId } =
    useWeb3React<Web3Provider>();
  const [isLogin, setIsLogin] = useState(active);
  const classes = useLoginButtonStyles();

  const handleConnectButton = async () => {
    if (isLogin) {
      handleLogout();
    } else {
      await activate(injected);
    }
  };

  useEffect(() => {
    if (chainId === BSC_TestNet.id && account) {
      setIsLogin(true);
    } else if (chainId || account) {
      confirm({
        title: 'Not correct network',
        description: 'Please choose Binance Smart Chain TestNet',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId]);

  const handleLogout = async () => {
    deactivate();
    setIsLogin(false);
  };

  return (
    <>
      {isLogin ? (
        <Chip
          className={classes.networkName}
          label={ChainList.find((c) => c.id === chainId)?.name}
        ></Chip>
      ) : null}
      <Button
        color="secondary"
        variant="contained"
        onClick={handleConnectButton}
        endIcon={isLogin ? <ExitToAppIcon /> : <AccountBalanceWalletIcon />}
      >
        {isLogin ? 'Logout' : 'Connect with MetaMask'}
      </Button>
    </>
  );
};

export default LoginButton;
