require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan");

const ALCHEMY_API_KEY = "L2h5VhdGmH_HMomOZyW1YH290AsrN6to";
const MUMBAI_PRIVATE_KEY = "2be196ac7730efebc5a0922d79bd5207b70e72ecfb2c7e09492134aca77c3eae";
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          evmVersion: "istanbul",
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks:{
    goerli:{
      chainId : 5,
      url:`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${MUMBAI_PRIVATE_KEY}`],
    }
  },
  paths: {
    tests: "./tests",
},
  etherscan:{
  apiKey: "8RP8YNVJDDRRS6PKV9U3TRSMJZKB65T8K3"
  //  apiKey: "YH572V2C142GFJGUJICCAJ7EQ5TZKYN46P" mumbai
  }
  // mocha: {
  //   timeout: 100000000,
  // },
}