import { Box, Container, Typography } from '@material-ui/core';
import React from 'react';
import LoginButton from '../../molecules/LoginButton';
import Erc20Form from '../../organisms/Erc20Form';
import Header from '../../organisms/Header';

const Erc20Page: React.FC = () => {
  return (
    <Box padding="medium">
      <Typography variant="h4" align="center">
        Create ERC20 Token
      </Typography>
      <Erc20Form />
    </Box>
  );
};

export default Erc20Page;
