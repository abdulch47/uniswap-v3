const { ethers } = require('ethers');
const { abi } = require('./artifacts/contracts/LiquidityExamples.sol/LiquidityExamples.json'); 
const {abi2} = require('./artifacts/contracts/interfaces/IWETH.sol/IWETH.json');

// Replace with your actual contract address
const contractAddress = '0x255908a99D78d7cD3D74CACECbb76Cfa241CD65F';
const contractAddress2 = '0xfD434944aB01eee420f39C9b01945A99C4554346';

// Replace with your private key or use a custom signer if needed
const privateKey = '2be196ac7730efebc5a0922d79bd5207b70e72ecfb2c7e09492134aca77c3eae';
const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/L2h5VhdGmH_HMomOZyW1YH290AsrN6to');
const wallet = new ethers.Wallet(privateKey, provider);

// Create a contract instance
const contract = new ethers.Contract(contractAddress, abi, wallet);
const contract2 = new ethers.Contract(contractAddress2, abi2, wallet);

// Replace with the actual values you want to use
const tokenId = 91325;
const amountAdd0 = ethers.utils.parseEther('0.00001'); 
const amountAdd1 = ethers.utils.parseUnits('352258', 18); 
async function interactWithContract() {
  try {
    // Check the current balance of the wallet
    const initialBalance = await wallet.getBalance();
    console.log('Initial ETH Balance:', ethers.utils.formatEther(initialBalance));

    const approveTx = await contract2.approve(contractAddress, amountAdd1);
    await approveTx.wait();
    console.log('Approval Transaction Hash:', approveTx.hash);

    // Execute the increaseLiquidityCurrentRange function
    const tx = await contract.increaseLiquidityCurrentRange(tokenId, amountAdd0, amountAdd1, {
      value: amountAdd0, // Sending ETH along with the transaction
    });

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log('Transaction Receipt:', receipt.hash);

    // Check the final balance of the wallet after executing the transaction
    const finalBalance = await wallet.getBalance();
    console.log('Final ETH Balance:', ethers.utils.formatEther(finalBalance));
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to interact with the contract
interactWithContract();
