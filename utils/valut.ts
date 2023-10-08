import { ethers } from 'hardhat'
import { bytecode as vaultByteCode } from '../artifacts/contracts/Vault.sol/Vault.json'
const { calculateCreate2 } = require('eth-create2-calculator')

const calVaultAddress = ({
  configAddress,
  assetAddress,
  vaultName,
  vaultSymbol,
  roleStoreAddress,
}: {
  configAddress: string
  assetAddress: string
  vaultName: string
  vaultSymbol: string
  roleStoreAddress: string
}) => {
  const bytes = ethers.utils.defaultAbiCoder.encode(
    ['string', 'address', 'address', 'string', 'string'],
    ['Vault', configAddress, assetAddress, vaultName, vaultSymbol]
  )
  const salt = ethers.utils.keccak256(ethers.utils.arrayify(bytes))

  return calculateCreate2(configAddress, salt, vaultByteCode, {
    params: [
      configAddress,
      assetAddress,
      vaultName,
      vaultSymbol,
      roleStoreAddress,
    ],
    types: ['address', 'address', 'string', 'string', 'address'],
  })
}

export { calVaultAddress }
