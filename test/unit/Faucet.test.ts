import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { deployments, ethers, network } from 'hardhat'
import {
  developmentChains,
  networkConfigMap,
} from '../../helper-hardhat-config'
import { Faucet, Token } from '../../typechain-types'

const chainId = network.config.chainId || 31337

!developmentChains.includes(chainId)
  ? describe.skip
  : describe('Faucet', () => {
      const deployFastPriceFixture = async () => {
        await deployments.fixture(['all', 'init'], {
          keepExistingDeployments: true,
        })
        const { deployer, player } = await ethers.getNamedSigners()

        // faucet
        const faucet = (await ethers.getContract('Faucet', deployer)) as Faucet

        // faucetUints
        const usdcFaucetUnits =
          networkConfigMap[chainId].usdcFaucetUnits || ethers.constants.Zero
        const wbtcFaucetUnits =
          networkConfigMap[chainId].wbtcFaucetUnits || ethers.constants.Zero
        const wethFaucetUnits =
          networkConfigMap[chainId].wethFaucetUnits || ethers.constants.Zero

        // usdc
        const usdc = (await ethers.getContract('USDC', deployer)) as Token

        // weth
        const weth = (await ethers.getContract('WETH', deployer)) as Token

        // wbtc
        const wbtc = (await ethers.getContract('WBTC', deployer)) as Token

        return {
          faucet,
          usdc,
          weth,
          wbtc,
          usdcFaucetUnits,
          wbtcFaucetUnits,
          wethFaucetUnits,
          deployer,
          player,
        }
      }

      describe('Get faucet with accounts', async () => {
        it('It will be reverted when set price with no keeper authed account player...', async () => {
          const {
            faucet,
            usdc,
            weth,
            wbtc,
            usdcFaucetUnits,
            wbtcFaucetUnits,
            wethFaucetUnits,
            deployer,
            player,
          } = await loadFixture(deployFastPriceFixture)

          //   faucet

          //   await expect(
          //     fastPrice
          //       .connect(player)
          //       .setPrices([usdc.address], [ethers.utils.parseEther('100')], {
          //         gasLimit: 300_000,
          //       })
          //   ).to.be.revertedWithCustomError(fastPrice, 'Unauthorized')
        })
      })
    })
