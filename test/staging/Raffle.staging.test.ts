import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { BigNumber } from 'ethers'
import { ethers, getNamedAccounts, network } from 'hardhat'
import {
  developmentChains,
  networkConfigMap,
} from '../../helper-hardhat-config'
import { Raffle } from '../../typechain-types'

const chainId = network.config.chainId || 31337

developmentChains.includes(chainId)
  ? describe.skip
  : describe('Raffle', () => {
      let raffle: Raffle
      let deployer
      let raffleEntranceFee: BigNumber
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        raffle = (await ethers.getContract('Raffle', deployer)) as Raffle
        raffleEntranceFee = await raffle.getEntranceFee()
      })

      describe('fullfillRandomWords', () => {
        it('pick a winner, resets the lottery, and send money', async () => {
          const startingTimeStamp = await raffle.getLastTimeStamp()
          // performUpkeep
          // fulfillRandomWords
          // wait for the event
          await new Promise(async (resolve, reject) => {
            raffle.once('WinnerPicked', async () => {
              console.log('found the event')
              try {
                const recentWinnner = await raffle.getRecentWinner()
                console.log(recentWinnner)
                const raffleState = await raffle.getRaffleState()
                const endingTimeStamp = await raffle.getLastTimeStamp()
                const numPlayers = await raffle.getNumberOfPlayers()
                expect(numPlayers).to.eq(0)
                expect(raffleState).to.eq(0)
                expect(endingTimeStamp).to.gt(startingTimeStamp)
                resolve('')
              } catch (error) {
                reject(error)
              }
            })

            await raffle.enterRaffle({ value: raffleEntranceFee })
          })
        })
      })
    })
