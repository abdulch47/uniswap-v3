const { ethers } = require('ethers');
const { abi } = require('./artifacts/contracts/LiquidityExamples.sol/LiquidityExamples.json');

const nonfungiblePositionManagerAddress = '0x255908a99D78d7cD3D74CACECbb76Cfa241CD65F'; // Replace with the actual address
const privateKey = '2be196ac7730efebc5a0922d79bd5207b70e72ecfb2c7e09492134aca77c3eae';
const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/L2h5VhdGmH_HMomOZyW1YH290AsrN6to');
const wallet = new ethers.Wallet(privateKey, provider);

const nonfungiblePositionManager = new ethers.Contract(nonfungiblePositionManagerAddress, abi, wallet); // Create a contract instance for NonFungiblePositionManager

const tokenId = 91325;
const liquidityToDecrease = ethers.utils.parseUnits("90", 18); // Replace with the actual liquidity you want to decrease

async function interactWithContract() {
  try {
    const initialBalance = await wallet.getBalance();
    console.log('Initial ETH Balance:', ethers.utils.formatEther(initialBalance));

    // Execute the decreaseLiquidity function
    const decreaseLiquidityTx = await nonfungiblePositionManager.decreaseLiquidity(tokenId, liquidityToDecrease);
    await decreaseLiquidityTx.wait();
    console.log('Decrease Liquidity Transaction Receipt:', decreaseLiquidityTx.hash);

    // Check the final balance of the wallet after executing the transaction
    const finalBalance = await wallet.getBalance();
    console.log('Final ETH Balance:', ethers.utils.formatEther(finalBalance));
  } catch (error) {
    console.error('Error:', error);
  }
}

interactWithContract();
