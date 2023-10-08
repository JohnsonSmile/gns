import { log } from 'console'
import { FTNFT } from './../typechain-types/contracts/FTNFT'
import { ethers, getNamedAccounts } from 'hardhat'
import keccak256 from 'keccak256'
import MerkleTree from 'merkletreejs'

async function main() {
  log(`nft whitelist already removed...`)

  // const { deployer, player } = await getNamedAccounts()
  // const ftNFTContract = (await ethers.getContract('FTNFT', deployer)) as FTNFT

  // ftNFTContract.connect(player)

  // const params = ethers.utils.solidityPack([], [])

  //   const signed = await owner.signMessage(params)
  //   console.log('owner address', owner.address)

  //   await testSignature.mint(
  //     owner.address,
  //     '10',
  //     ethers.utils.keccak256('0x66'),
  //     signed
  //   )

  // const ftNFTContract = (await ethers.getContract('FTNFT', deployer)) as FTNFT
  // const root = getRoot()
  // log(`setting merkle root...`)
  // // update ft merkle root
  // await ftNFTContract.setMerkleRoot(root, true)
  // const merkleRoot = await ftNFTContract.ftMerkleRoot()
  // log(`merkle root is ${merkleRoot}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
