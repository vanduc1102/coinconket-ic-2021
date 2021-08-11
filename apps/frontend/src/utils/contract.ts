function getContractBinary(
  compileResult: any,
  fileName = 'storage.sol',
  contractName = 'SimpleStorage'
): string {
  const byteCode =
    compileResult?.contracts[fileName]?.[contractName].evm.bytecode.object;

  return byteCode ? '0x' + byteCode : '';
}

export { getContractBinary };
