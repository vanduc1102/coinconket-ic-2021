import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    inputField: {
      marginTop: theme.spacing(3),
    },
  })
);

export default useStyles;
