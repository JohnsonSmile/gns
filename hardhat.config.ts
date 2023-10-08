import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'hardhat-deploy'
import 'dotenv/config'
import './tasks'

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || ''
const GOERLI_USER_PRIVATE_KEY = process.env.GOERLI_USER_PRIVATE_KEY || ''
const GOERLI_ETHERSCAN_KEY = process.env.GOERLI_ETHERSCAN_KEY || ''
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ''

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.14',
        settings: {
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: '0.6.0',
      },
    ],
  },
  defaultNetwork: 'hardhat',
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [GOERLI_USER_PRIVATE_KEY],
      chainId: 5,
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      chainId: 31337,
    },
  },
  // hh verify --list-networks 查看支持的网络，如果没有则需要自定义。
  // hh verify --network goerli <合约地址> <参数>
  etherscan: {
    apiKey: {
      goerli: GOERLI_ETHERSCAN_KEY,
    },
  },
  gasReporter: {
    enabled: false,
    // outputFile: 'gas-report.txt',
    // noColors: true,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY,
    // token: ''
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
  mocha: {
    timeout: 200_000, // 200 seconds
  },
}

export default config
