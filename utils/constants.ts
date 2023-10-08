import { ethers } from 'hardhat'

const KEEPER_ROLE_HASH = ethers.utils.keccak256(
  ethers.utils.defaultAbiCoder.encode(['string'], ['KEEPER'])
)
const SYSTEM_ROLE_HASH = ethers.utils.keccak256(
  ethers.utils.defaultAbiCoder.encode(['string'], ['SYSTEM'])
)
const CONFIG_ROLE_HASH = ethers.utils.keccak256(
  ethers.utils.defaultAbiCoder.encode(['string'], ['CONFIG'])
)

export { KEEPER_ROLE_HASH, SYSTEM_ROLE_HASH, CONFIG_ROLE_HASH }
