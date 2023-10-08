import { log } from 'console'
import { FTNFT } from './../typechain-types/contracts/FTNFT'
import { ethers, getNamedAccounts } from 'hardhat'
import keccak256 from 'keccak256'
import MerkleTree from 'merkletreejs'

const whiteListAddresses = [
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
  '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
  '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
  '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
  '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f',
  '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
  '0xBcd4042DE499D14e55001CcbB24a551F3b954096',
  '0x6b42f2afD76773dE69Da1D7589AA9CCd18098dDB',
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
]

const defaultQuantity = 1

// TODO: modify this when second snapshot
const quantityForAddressMap: { [key: string]: number } = {
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8': 1,
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC': 1,
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906': 1,
  '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65': 1,
  '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc': 1,
  '0x976EA74026E726554dB657fA54763abd0C3a0aa9': 1,
  '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955': 1,
  '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f': 1,
  '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720': 1,
  '0xBcd4042DE499D14e55001CcbB24a551F3b954096': 1,
  '0x6b42f2afD76773dE69Da1D7589AA9CCd18098dDB': 1,
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266': 1,
}

const whiteListInfoAddress = whiteListAddresses.map((addr) => ({
  address: addr,
  quantity: quantityForAddressMap[addr] || defaultQuantity,
}))

const leafNodes = whiteListInfoAddress.map((x) =>
  ethers.utils.solidityKeccak256(
    ['address', 'uint256'],
    [x.address, x.quantity]
  )
)

const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })

const getRoot = () => {
  return tree.getHexRoot()
}

const getProof = (address: string, quantity: number) => {
  const leaf = ethers.utils.solidityKeccak256(
    ['address', 'uint256'],
    [address, quantity]
  )
  const proof = tree.getHexProof(leaf)
  return { proof, root: tree.getHexRoot() }
}

async function main() {
  log(`nft whitelist already removed...`)
  const { deployer } = await getNamedAccounts()
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
