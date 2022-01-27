require("@nomiclabs/hardhat-etherscan");
let secret = require("./secret");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.7",
    networks: {
        bscTestnet: {
            url: secret.url,
            accounts: [secret.key]
        }
    },
    etherscan: {
      // Your API key for Etherscan
      // Obtain one at https://etherscan.io/
      apiKey: {
        bscTestnet: "KC2XV5ISX7SNQPNPB6QFEE3J95HWZXJBQ5"
      }
    }
};
