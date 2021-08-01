import { Typography } from '@material-ui/core';
import React from 'react';
import Erc20Form from '../../organisms/Erc20Form';
import Header from '../../organisms/Header';

const Erc20Page: React.FC = () => {
  return (
    <>
      <Typography variant="h2" align="center">Welcome to CoinConKet!</Typography>
      <Header />
      <Erc20Form />
    </>
  );
};

export default Erc20Page;
