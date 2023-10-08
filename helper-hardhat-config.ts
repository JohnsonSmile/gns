import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'

interface NetworkConfig {
  name: string
  wethAddress?: string
  wbtcAddress?: string
  usdcAddress?: string
  usdtAddress?: string
  gasLimit?: number
  usdcFaucetUnits?: BigNumber
  wethFaucetUnits?: BigNumber
  wbtcFaucetUnits?: BigNumber
  tokenFaucetUnits?: BigNumber
}

const networkConfigMap: { [key: number]: NetworkConfig } = {
  5: {
    name: 'goerli',
    wethAddress: '',
    wbtcAddress: '',
    usdcAddress: '',
    usdtAddress: '',
    gasLimit: 300_000,
    tokenFaucetUnits: ethers.utils.parseEther('100000'),
  },
  31337: {
    name: 'hardhat',
    wethAddress: '',
    wbtcAddress: '',
    usdcAddress: '',
    usdtAddress: '',
    gasLimit: 300_000,
    usdcFaucetUnits: ethers.utils.parseEther('100000'),
    wethFaucetUnits: ethers.utils.parseEther('50'),
    wbtcFaucetUnits: ethers.utils.parseEther('5'),
    tokenFaucetUnits: ethers.utils.parseEther('100000'),
  },
}

const developmentChains = [31337]
const PRICEFEED_DECIMALS = 8
const INITIAL_ANSWER = ethers.utils.parseUnits('2000', 8)

export {
  networkConfigMap,
  developmentChains,
  PRICEFEED_DECIMALS,
  INITIAL_ANSWER,
}
