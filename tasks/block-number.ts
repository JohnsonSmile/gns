import { task } from 'hardhat/config'

task('blocknumber', 'Prints the current block number').setAction(
  async (taskArgs, hre) => {
    const { ethers } = hre
    const blockNum = await ethers.provider.getBlockNumber()
    console.log(`Current blocknumber is: ${blockNum}`)
  }
)
