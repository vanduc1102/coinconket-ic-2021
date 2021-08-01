import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Box, Typography } from '@material-ui/core';

function Account() {
  const { account } = useWeb3React();

  return (
    <Box>
      <Typography>Account</Typography>
      <span role="img" aria-label="robot">
        🤖
      </span>
      <span>
        {account === null
          ? '-'
          : account
          ? `${account.substring(0, 6)}...${account.substring(
              account.length - 4
            )}`
          : ''}
      </span>
    </Box>
  );
}

export default Account;
