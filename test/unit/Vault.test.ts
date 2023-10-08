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
  Hayek,
  RoleStore,
  Token,
  Vault,
} from '../../typechain-types'
import { calVaultAddress } from '../../utils/valut'
import exp from 'constants'
import { log } from 'console'
import { CONFIG_ROLE_HASH, SYSTEM_ROLE_HASH } from '../../utils/constants'

const chainId = network.config.chainId || 31337

!developmentChains.includes(chainId)
  ? describe.skip
  : describe('Vault', () => {
      const deployFastPriceFixture = async () => {
        await deployments.fixture(['all', 'init'], {
          keepExistingDeployments: true,
        })
        const { deployer, player } = await ethers.getNamedSigners()

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

        const usdcVault = (await ethers.getContractAt(
          'Vault',
          usdcVaultAddress,
          deployer
        )) as Vault

        // weth
        const weth = (await ethers.getContract('WETH', deployer)) as Token

        const wethVaultAddress = calVaultAddress({
          configAddress: config.address,
          assetAddress: weth.address,
          vaultName: 'weth-lp',
          vaultSymbol: 'weth-lp',
          roleStoreAddress: roleStore.address,
        })

        const wethVault = (await ethers.getContractAt(
          'Vault',
          wethVaultAddress,
          deployer
        )) as Vault

        // wbtc
        const wbtc = (await ethers.getContract('WBTC', deployer)) as Token

        const wbtcVaultAddress = calVaultAddress({
          configAddress: config.address,
          assetAddress: wbtc.address,
          vaultName: 'wbtc-lp',
          vaultSymbol: 'wbtc-lp',
          roleStoreAddress: roleStore.address,
        })

        const wbtcVault = (await ethers.getContractAt(
          'Vault',
          wbtcVaultAddress,
          deployer
        )) as Vault

        const fastPriceFeed = (await ethers.getContract(
          'FastPriceFeed'
        )) as FastPriceFeed

        return {
          config,
          roleStore,
          fastPriceFeed,
          usdc,
          usdcVaultAddress,
          usdcVault,
          weth,
          wethVaultAddress,
          wethVault,
          wbtc,
          wbtcVaultAddress,
          wbtcVault,
          deployer,
          player,
        }
      }

      describe('Vault assets and vault address', async () => {
        it('It should be equal to the address calculated', async () => {
          const {
            usdc,
            usdcVaultAddress,
            usdcVault,
            weth,
            wethVaultAddress,
            wethVault,
            wbtc,
            wbtcVaultAddress,
            wbtcVault,
          } = await loadFixture(deployFastPriceFixture)
          const usdcAssetAddress = await usdcVault.asset()
          const wethAssetAddress = await wethVault.asset()
          const wbtcAssetAddress = await wbtcVault.asset()
          expect(usdcAssetAddress).to.be.eq(
            usdc.address,
            'usdc valut assets not eq usdc address'
          )
          expect(usdcVault.address).to.be.eq(
            usdcVaultAddress,
            'usdc valut assets not eq usdc vault address calculated'
          )
          expect(wethAssetAddress).to.be.eq(
            weth.address,
            'weth vault assets not eq weth address'
          )
          expect(wethVault.address).to.be.eq(
            wethVaultAddress,
            'weth vault assets not eq weth vault address calculated'
          )
          expect(wbtcAssetAddress).to.be.eq(
            wbtc.address,
            'wbtc vault assets not eq wbtc address'
          )
          expect(wbtcVault.address).to.be.eq(
            wbtcVaultAddress,
            'wbtc vault assets not eq wbtc vault address calculated'
          )
        })
      })

      describe('Vault init function', async () => {
        it('It should be init properly when sender has role config', async () => {
          const {
            roleStore,
            usdcVault,
            fastPriceFeed,
            wethVault,
            wbtcVault,
            deployer,
          } = await loadFixture(deployFastPriceFixture)

          // 1. grant config role for deployer
          await roleStore.grantRole(CONFIG_ROLE_HASH, deployer.address)

          const priceConfig = {
            oracle: ethers.constants.AddressZero,
            oracleDecimals: 8,
            fastPriceFeed: fastPriceFeed.address,
            fastPriceFeedDecimals: 8,
          }

          // usdc
          // init vault
          await expect(usdcVault.connect(deployer).init(priceConfig)).to.emit(
            usdcVault,
            'InitVault'
          )
          const usdcPriceFeed = await usdcVault.getAssetPriceConfig()
          expect(usdcPriceFeed.fastPriceFeed).to.be.eq(
            priceConfig.fastPriceFeed,
            'usdc vault pricefeed config not eq price config1'
          )
          expect(usdcPriceFeed.fastPriceFeedDecimals).to.be.eq(
            priceConfig.fastPriceFeedDecimals,
            'usdc vault pricefeed config not eq price config2'
          )
          expect(usdcPriceFeed.oracle).to.be.eq(
            priceConfig.oracle,
            'usdc vault pricefeed config not eq price config3'
          )
          expect(usdcPriceFeed.oracleDecimals).to.be.eq(
            priceConfig.oracleDecimals,
            'usdc vault pricefeed config not eq price config4'
          )

          // weth
          // init vault
          await expect(wethVault.connect(deployer).init(priceConfig)).to.emit(
            wethVault,
            'InitVault'
          )
          const wethPriceFeed = await wethVault.getAssetPriceConfig()
          expect(wethPriceFeed.fastPriceFeed).to.be.eq(
            priceConfig.fastPriceFeed,
            'weth vault pricefeed config not eq price config1'
          )
          expect(wethPriceFeed.fastPriceFeedDecimals).to.be.eq(
            priceConfig.fastPriceFeedDecimals,
            'weth vault pricefeed config not eq price config2'
          )
          expect(wethPriceFeed.oracle).to.be.eq(
            priceConfig.oracle,
            'weth vault pricefeed config not eq price config3'
          )
          expect(wethPriceFeed.oracleDecimals).to.be.eq(
            priceConfig.oracleDecimals,
            'weth vault pricefeed config not eq price config4'
          )

          // wbtc
          // init vault
          await expect(wbtcVault.connect(deployer).init(priceConfig)).to.emit(
            wbtcVault,
            'InitVault'
          )
          const wbtcPriceFeed = await wbtcVault.getAssetPriceConfig()
          expect(wbtcPriceFeed.fastPriceFeed).to.be.eq(
            priceConfig.fastPriceFeed,
            'wbtc vault pricefeed config not eq price config1'
          )
          expect(wbtcPriceFeed.fastPriceFeedDecimals).to.be.eq(
            priceConfig.fastPriceFeedDecimals,
            'wbtc vault pricefeed config not eq price config2'
          )
          expect(wbtcPriceFeed.oracle).to.be.eq(
            priceConfig.oracle,
            'wbtc vault pricefeed config not eq price config3'
          )
          expect(wbtcPriceFeed.oracleDecimals).to.be.eq(
            priceConfig.oracleDecimals,
            'wbtc vault pricefeed config not eq price config4'
          )
        })

        it('It should be reverted when sender has no role config', async () => {
          const { usdcVault, fastPriceFeed, wethVault, wbtcVault, player } =
            await loadFixture(deployFastPriceFixture)

          // player has no role for config

          const priceConfig = {
            oracle: ethers.constants.AddressZero,
            oracleDecimals: 8,
            fastPriceFeed: fastPriceFeed.address,
            fastPriceFeedDecimals: 8,
          }

          // usdc
          // init vault
          await expect(
            usdcVault.connect(player).init(priceConfig)
          ).to.revertedWithCustomError(usdcVault, 'Unauthorized')

          // weth
          // init vault
          await expect(
            wethVault.connect(player).init(priceConfig)
          ).to.revertedWithCustomError(usdcVault, 'Unauthorized')

          // wbtc
          // init vault
          await expect(
            wbtcVault.connect(player).init(priceConfig)
          ).to.revertedWithCustomError(usdcVault, 'Unauthorized')
        })
      })

      //  TODO: When order created or executed should consider the remained liquidity
      // TODO: increaseLiquidity and decreaseLiquidity not triggered when user withdraw or deposit. It should be triggered when user withdraw or deposit. getAvailableLiquidity may be less than zero and revert.
      /***
       * 
        function getAvailableLiquidity() public view returns (uint256) {
                uint256 maxSize = (totalAssets() * getAssetPrice().min) /
                    (10 ** decimals()) -
                    vault.fundsOccupied;
                return maxSize;
        }
       */
      describe('Vault increaseOccupiedLiquidity for future use', async () => {
        it('It should be increase properly when sender has role system', async () => {
          const {
            roleStore,
            usdcVault,
            fastPriceFeed,
            wethVault,
            wbtcVault,
            deployer,
          } = await loadFixture(deployFastPriceFixture)

          // 1. grant system role for deployer
          await roleStore.grantRole(SYSTEM_ROLE_HASH, deployer.address)

          const availableLiquidityBeforeIncrease =
            await usdcVault.getAvailableLiquidity()
          log(`\tAvailable liquidity is ${availableLiquidityBeforeIncrease}`)
        })

        it('It should be reverted when sender has no role system', async () => {
          const { usdcVault, fastPriceFeed, wethVault, wbtcVault, player } =
            await loadFixture(deployFastPriceFixture)
          // player has no role for system
        })
      })
    })
