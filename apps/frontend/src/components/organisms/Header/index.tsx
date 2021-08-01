import React from 'react';
import { useWeb3React } from '@web3-react/core';
import ChainId from '../../atoms/ChainId';
import BlockNumber from '../../atoms/BlockNumber';
import Account from '../../atoms/Account';
import Balance from '../../atoms/Balance';
import { Box } from '@material-ui/core';

function Header() {
  const { active, error } = useWeb3React();

  return (
    <>
      <h1 style={{ margin: '1rem', textAlign: 'right' }}>
        {active ? '🟢' : error ? '🔴' : '🟠'}
      </h1>
      <Box>
        <ChainId />
        <BlockNumber />
        <Account />
        <Balance />
      </Box>
    </>
  );
}

export default Header;
