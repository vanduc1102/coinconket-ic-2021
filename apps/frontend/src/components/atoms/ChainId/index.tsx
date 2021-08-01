import { Box } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';

function ChainId() {
  const { chainId } = useWeb3React();

  return (
    <Box>
      <span>Chain Id</span>
      <span role="img" aria-label="chain">
        ⛓
      </span>
      <span>{chainId ?? ''}</span>
    </Box>
  );
}

export default ChainId;
