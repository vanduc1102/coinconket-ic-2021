import React, { useEffect, useMemo, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import {
  Box,
  Button,
  TextField,
  useTheme,
  CircularProgress,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useWeb3React } from '@web3-react/core';

import useStyles from './styles';
import ERC20ContractContent from '../../../configurations/contracts/erc20';
import { getContractBinary } from '../../../utils/contract';
import { ContractConfig } from './types';

const CONFIRMATION_BLOCKS = 3;

const validationSchema = yup.object({
  contractName: yup.string().required('Contract name is required.'),
  tokenName: yup.string().required('Token name is required.'),
  tokenSymbol: yup
    .string()
    .max(20, 'Token Symbol should be of maximum 20 characters length')
    .required('Token Symbol is required'),
  tokenMaxSupply: yup.number().required('Token max supply is required.'),
});

const ContactDeployedMessage: React.FC<{
  txHash: string;
}> = ({ txHash }) => {
  return (
    <span>
      <span>Contract deployed successfully </span>
      {', '}
      <a
        href={`https://testnet.bscscan.com/tx/${txHash}`}
        target="_blank"
        rel="noreferrer"
      >
        view detail
      </a>
    </span>
  );
};

const formDefaultValue: ContractConfig = {
  tokenName: 'Coin Con Ket',
  tokenSymbol: 'CONKET',
  contractName: 'CoinConKetContract',
  tokenMaxSupply: 1_000_000_000,
};

const Erc20Form: React.FC = () => {
  const classes = useStyles();
  const [compileResult, setCompileResult] = useState<any>(null);
  const { library, account } = useWeb3React<Web3Provider>();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const handleFormSubmit = async (contractConfig: ContractConfig) => {
    if (!account) {
      enqueueSnackbar('Please connect your MetaMask wallet first.', {
        variant: 'warning',
      });
      return;
    }

    await handleCompile(contractConfig);
    await handleDeploy(contractConfig);
  };

  const soliditySolc: Worker = useMemo(() => {
    return new Worker('../../../SolidityCompiler.worker.ts', {
      type: 'module',
    });
  }, []);

  useEffect(() => {
    soliditySolc.onmessage = ($event) => {
      setCompileResult(JSON.parse($event.data));
      enqueueSnackbar('Contract compiled successfully.', {
        variant: 'success',
      });
    };

    return () => {
      soliditySolc.terminate();
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [soliditySolc]);

  const handleCompile = async (contractConfig: ContractConfig) => {
    setCompileResult(null);

    const preparedContractContent = ERC20ContractContent.replace(
      '{{ContractName}}',
      contractConfig.contractName
    )
      .replace('{{TokenName}}', contractConfig.tokenName)
      .replace('{{TokenSymbol}}', contractConfig.tokenSymbol)
      .replace('{{TokenMaxSupply}}', String(contractConfig.tokenMaxSupply));

    soliditySolc.postMessage({
      command: 'compile',
      contractFileName: contractConfig.contractName + '.sol',
      content: preparedContractContent,
    });
  };

  const handleDeploy = async (contractConfig: ContractConfig) => {
    const contractBinary = getContractBinary(
      compileResult,
      contractConfig.contractName + '.sol',
      contractConfig.contractName
    );
    if (!contractBinary) {
      enqueueSnackbar(
        'Contract is compiling, please wait a minute and try again.',
        {
          variant: 'warning',
        }
      );
      return;
    }
    const newTxn = {
      from: account || '-',
      data: contractBinary,
    };

    try {
      const deployResult = await library?.getSigner().sendTransaction(newTxn);
      const txHash = deployResult?.hash || '';
      const confirmed = await library?.waitForTransaction(
        txHash,
        CONFIRMATION_BLOCKS,
        60 * 1000
      );
      if (confirmed) {
        enqueueSnackbar(<ContactDeployedMessage txHash={txHash} />, {
          variant: 'success',
        });
      }
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
    }
  };

  const formik = useFormik<ContractConfig>({
    initialValues: {
      ...formDefaultValue,
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit: handleFormSubmit,
  });

  return (
    <Box marginTop={theme.spacing(1)}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          className={classes.inputField}
          id="contractName"
          name="contractName"
          label="Contract Name"
          type="text"
          variant="outlined"
          value={formik.values.contractName}
          onChange={formik.handleChange}
          error={
            formik.touched.contractName && Boolean(formik.errors.contractName)
          }
          helperText={formik.touched.contractName && formik.errors.contractName}
        />
        <TextField
          fullWidth
          className={classes.inputField}
          id="tokenName"
          name="tokenName"
          label="Token name"
          type="text"
          variant="outlined"
          value={formik.values.tokenName}
          onChange={formik.handleChange}
          error={formik.touched.tokenName && Boolean(formik.errors.tokenName)}
          helperText={formik.touched.tokenName && formik.errors.tokenName}
        />
        <TextField
          fullWidth
          className={classes.inputField}
          id="tokenSymbol"
          name="tokenSymbol"
          label="Token symbol"
          type="text"
          variant="outlined"
          value={formik.values.tokenSymbol}
          onChange={formik.handleChange}
          error={
            formik.touched.tokenSymbol && Boolean(formik.errors.tokenSymbol)
          }
          helperText={formik.touched.tokenSymbol && formik.errors.tokenSymbol}
        />
        <TextField
          fullWidth
          className={classes.inputField}
          id="tokenMaxSupply"
          name="tokenMaxSupply"
          label="Token Max Supply"
          type="number"
          variant="outlined"
          value={formik.values.tokenMaxSupply}
          onChange={formik.handleChange}
          error={
            formik.touched.tokenMaxSupply &&
            Boolean(formik.errors.tokenMaxSupply)
          }
          helperText={
            formik.touched.tokenMaxSupply && formik.errors.tokenMaxSupply
          }
        />
        <Button
          className={classes.inputField}
          disabled={formik.isSubmitting}
          color="primary"
          variant="contained"
          endIcon={
            formik.isSubmitting ? (
              <CircularProgress size="1.5rem" color="secondary" />
            ) : null
          }
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Erc20Form;
