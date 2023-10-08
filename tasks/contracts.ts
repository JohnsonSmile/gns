import { task } from 'hardhat/config'

task('contracts', 'Prints the contracts').setAction(async (taskArgs, hre) => {
  const { deployments } = hre
  const contracts = await deployments.all()
  const contractNames = Object.keys(contracts)
  contractNames.forEach((name) => {
    console.log(`${name}: "${contracts[name].address}",`)
  })
})
