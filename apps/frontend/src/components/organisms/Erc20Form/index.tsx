import React, { useEffect, useMemo, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Box, Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useStyles from './styles';
import { useTheme } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../../configurations/connectors';
import StorageContractContent from '../../../configurations/contracts/storage';

const validationSchema = yup.object({
  name: yup.string().required('name is required'),
  symbol: yup
    .string()
    .max(20, 'Symbol should be of maximum 20 characters length')
    .required('Symbol is required'),
});

const Erc20Form: React.FC = () => {
  const [compileResult, setCompileResult] = useState();

  const soliditySolc: Worker = useMemo(() => {
    return new Worker('../../../SolidityCompiler.worker.ts', {
      type: 'module',
    });
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  const { active, activate, deactivate } = useWeb3React<Web3Provider>();
  const [isLogin, setIsLogin] = useState(active);

  const formik = useFormik({
    initialValues: {
      name: 'Coin Con Ket',
      symbol: 'CONKET',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const handleConnectButton = async () => {
    if (isLogin) {
      handleLogout();
      setIsLogin(false);
    } else {
      const account = await activate(injected);
      setIsLogin(true);
    }
  };

  const handleLogout = async () => {
    deactivate();
  };

  useEffect(() => {
    soliditySolc.onmessage = ($event) => {
      console.log('$event.data: ', $event.data);
      setCompileResult($event.data);
    };

    return () => {
      soliditySolc.terminate();
    };
  }, [soliditySolc]);

  const handleCompile = async () => {
    console.log('Handle compile: ', Date.now());
    console.log('StorageContract:::', StorageContractContent);

    soliditySolc.postMessage({
      command: 'compile',
      content: StorageContractContent,
    });
  };

  return (
    <>
      <Box marginBottom={theme.spacing(1)} marginTop={theme.spacing(1)}>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleConnectButton}
        >
          {isLogin ? 'Logout' : 'Login with MetaMask'}
        </Button>
      </Box>
      <Box marginTop={theme.spacing(1)}>
        <Button color="default" variant="contained" onClick={handleCompile}>
          Compile
        </Button>
      </Box>
      <Box>{JSON.stringify(compileResult)}</Box>
      <Box marginTop={theme.spacing(1)}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            className={classes.inputField}
            id="name"
            name="name"
            label="Token name"
            type="text"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            className={classes.inputField}
            id="symbol"
            name="symbol"
            label="Token symbol"
            type="text"
            variant="outlined"
            value={formik.values.symbol}
            onChange={formik.handleChange}
            error={formik.touched.symbol && Boolean(formik.errors.symbol)}
            helperText={formik.touched.symbol && formik.errors.symbol}
          />
          <Button
            className={classes.inputField}
            color="primary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Erc20Form;
