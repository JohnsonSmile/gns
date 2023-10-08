import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { deployments, ethers, network } from 'hardhat'
import {
  developmentChains,
  networkConfigMap,
} from '../../helper-hardhat-config'
import {
  Config,
  FastPriceFeed,
  Faucet,
  Hayek,
  RoleStore,
  Token,
} from '../../typechain-types'
import { calVaultAddress } from '../../utils/valut'

const chainId = network.config.chainId || 31337

!developmentChains.includes(chainId)
  ? describe.skip
  : describe('Hayek', () => {
      const deployFastPriceFixture = async () => {
        await deployments.fixture(['all', 'init'], {
          keepExistingDeployments: true,
        })
        const { deployer, player } = await ethers.getNamedSigners()

        // hayek
        const hayek = (await ethers.getContract('Hayek', deployer)) as Hayek

        // config
        const config = (await ethers.getContract('Config', deployer)) as Config

        // role store
        const roleStore = (await ethers.getContract(
          'RoleStore',
          deployer
        )) as RoleStore

        // usdc
        const usdc = (await ethers.getContract('USDC', deployer)) as Token

        const usdcVaultAddress = calVaultAddress({
          configAddress: config.address,
          assetAddress: usdc.address,
          vaultName: 'usdc-lp',
          vaultSymbol: 'usdc-lp',
          roleStoreAddress: roleStore.address,
        })

        // weth
        const weth = (await ethers.getContract('WETH', deployer)) as Token

        const wethVaultAddress = calVaultAddress({
          configAddress: config.address,
          assetAddress: usdc.address,
          vaultName: 'weth-lp',
          vaultSymbol: 'weth-lp',
          roleStoreAddress: roleStore.address,
        })

        // wbtc
        const wbtc = (await ethers.getContract('WBTC', deployer)) as Token

        const wbtcVaultAddress = calVaultAddress({
          configAddress: config.address,
          assetAddress: usdc.address,
          vaultName: 'wbtc-lp',
          vaultSymbol: 'wbtc-lp',
          roleStoreAddress: roleStore.address,
        })

        return {
          hayek,
          config,
          roleStore,
          usdc,
          usdcVaultAddress,
          weth,
          wethVaultAddress,
          wbtc,
          wbtcVaultAddress,
          deployer,
          player,
        }
      }

      // It is used for model contract to transfer vault assets(eg: usdcVault->usdc) from fromAccount to toAccount
      // TODO: maybe the role only should be the model contract and the role who can use model should be the deployer or something..
      describe('Only system can transfer from', async () => {
        it('It will be reverted when the sender is not the system authorized player', async () => {
          const {
            hayek,
            config,
            roleStore,
            usdc,
            usdcVaultAddress,
            weth,
            wethVaultAddress,
            wbtc,
            wbtcVaultAddress,
            deployer,
            player,
          } = await loadFixture(deployFastPriceFixture)

          //   hayek.connect(player).transferFrom(usdc.address)
        })
      })
    })
