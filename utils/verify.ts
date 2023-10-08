import { run } from 'hardhat'

const verify = async (contractAddress: string, ...args: any[]) => {
  console.log('Verifying contract..')
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
    console.log('Contract verified!')
  } catch (err: any) {
    if (err.message.toLowerCase().includes('already been verified')) {
      console.log('Already verified!')
    } else {
      console.log(err)
    }
  }
}

export { verify }
