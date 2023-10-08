import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { deployments, ethers, network } from 'hardhat'
import { developmentChains } from '../../helper-hardhat-config'
import { FastPriceFeed, Token } from '../../typechain-types'

const chainId = network.config.chainId || 31337

!developmentChains.includes(chainId)
  ? describe.skip
  : describe('FastPriceFeed', () => {
      const deployFastPriceFixture = async () => {
        await deployments.fixture(['all', 'init'], { keepExistingDeployments: true })
        const { deployer, player } = await ethers.getNamedSigners()

        // fast price feed
        const fastPrice = (await ethers.getContract('FastPriceFeed',deployer)) as FastPriceFeed

        // usdc
        const usdc = (await ethers.getContract('USDC', deployer)) as Token

        return { fastPrice, usdc, deployer, player }
      }

      describe('Set price feed with accounts', async () => {
        it('It will be reverted when set price with no keeper authed account player...', async () => {
          const { fastPrice, usdc, player } = await loadFixture(deployFastPriceFixture)
          
          await expect(fastPrice.connect(player).setPrices([usdc.address], [ethers.utils.parseEther("100")], {
            gasLimit: 300_000,
          })).to.be.revertedWithCustomError(fastPrice, 'Unauthorized')
        })

        it('It will be set properly when set price with keeper authed account deployer...', async () => {
          const { fastPrice, usdc, deployer } = await loadFixture(deployFastPriceFixture)

          expect(await fastPrice.connect(deployer).setPrices([usdc.address], [ethers.utils.parseEther("100")], {
            gasLimit: 300_000,
          })).to.emit(fastPrice, "PriceUpdated")
          const price = await fastPrice.getPriceByToken(usdc.address)
          expect(price.price).to.be.eq(ethers.utils.parseEther("100"))
        })
      })

    })
