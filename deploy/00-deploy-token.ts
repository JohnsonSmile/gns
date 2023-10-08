import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { developmentChains, networkConfigMap } from '../helper-hardhat-config'
import { ethers, network } from 'hardhat'
import { verify } from '../utils/verify'

const chainId = network.config.chainId || 31337
const TEST_TOKENS = [
  {
    name: 'USDC',
    faucetUnits:
      networkConfigMap[chainId].usdcFaucetUnits || ethers.constants.Zero,
  },
  {
    name: 'WETH',
    faucetUnits:
      networkConfigMap[chainId].wethFaucetUnits || ethers.constants.Zero,
  },
  {
    name: 'WBTC',
    faucetUnits:
      networkConfigMap[chainId].wbtcFaucetUnits || ethers.constants.Zero,
  },
]

const tokenFaucetUnits =
  networkConfigMap[chainId].tokenFaucetUnits || ethers.constants.Zero

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  //   // only develop chains will deploy mock tokens
  //   if (developmentChains.includes(chainId)) {
  //     log("==================================================")

  //     for (let i = 0; i < TEST_TOKENS.length; i++) {
  //         const testToken = TEST_TOKENS[i];
  //         log(`deploy ${testToken.name}...`)

  //         const token = await deploy(`${testToken.name}`, {
  //             contract: "Token",
  //             from: deployer,
  //             args: [
  //                 testToken.name, // name
  //                 testToken.name, // symbol
  //                 0,  // initial supply
  //                 testToken.faucetUnits, // faucet units
  //             ],
  //             log: true,
  //         })
  //         log(`${testToken.name} is deployed at: ${token.address}`)
  //     }
  //   }

  //   // TODO: fix this
  //   log(`deploy Token...`)
  //   const token = await deploy(`Token`, {
  //       contract: "Token",
  //       from: deployer,
  //       args: [
  //           "Token", // TODO: name, BasePerp Token, not needed
  //           "Token", // symbol
  //           0, // initial supply
  //           tokenFaucetUnits,// faucet units
  //       ],
  //       log: true,
  //   })
  //   log(`Token is deployed at: ${token.address}`)
}
func.dependencies = []
func.tags = ['all', 'token']
export default func
