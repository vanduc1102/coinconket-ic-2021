import React, { useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Box, Button, useTheme } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../../configurations/connectors';

const LoginButton: React.FC = () => {
  const theme = useTheme();
  const { active, activate, deactivate } = useWeb3React<Web3Provider>();
  const [isLogin, setIsLogin] = useState(active);

  const handleConnectButton = async () => {
    if (isLogin) {
      handleLogout();
      setIsLogin(false);
    } else {
      const acc = await activate(injected);
      setIsLogin(true);
    }
  };

  const handleLogout = async () => {
    deactivate();
  };

  return (
    <Box marginBottom={theme.spacing(1)} marginTop={theme.spacing(1)}>
      <Button
        color="secondary"
        variant="contained"
        onClick={handleConnectButton}
      >
        {isLogin ? 'Logout' : 'Login with MetaMask'}
      </Button>
    </Box>
  );
};

export default LoginButton;
