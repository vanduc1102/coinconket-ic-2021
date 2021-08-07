/* eslint-disable no-restricted-globals */
import * as wrapper from 'solc/wrapper';
const ctx: Worker = self as any;

importScripts(
  'https://solc-bin.ethereum.org/bin/soljson-v0.8.6+commit.11564f7e.js'
);

console.log('Solidity compiler Worker: ', Date.now());

ctx.addEventListener('message', ({ data }) => {
  const solc = wrapper((ctx as any).Module);
  console.log('Solidity compiler Worker receiving: ', data);
  const compileResult = solc.compile(
    createCompileInput('storage.sol', data.content)
  );
  ctx.postMessage(compileResult);
});

function createCompileInput(fileName: string, fileContent: string): string {
  return JSON.stringify({
    language: 'Solidity',
    sources: {
      [fileName]: {
        content: fileContent,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  });
}
