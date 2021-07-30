import React from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useStyles from './styles';
import { useTheme } from '@material-ui/core';

const validationSchema = yup.object({
  name: yup.string().required('name is required'),
  symbol: yup
    .string()
    .max(20, 'Symbol should be of maximum 20 characters length')
    .required('Symbol is required'),
});

const Erc20Form: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

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

  const handleMetaMaskLogin = () => {
    console.log('okkokok', theme.spacing());
  };

  return (
    <>
      <Box marginBottom={theme.spacing(1)} marginTop={theme.spacing(1)}>
        <Button color="primary" variant="contained" onClick={handleMetaMaskLogin}>
          Login with MetaMask
        </Button>
      </Box>
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
    </>
  );
};

export default Erc20Form;
