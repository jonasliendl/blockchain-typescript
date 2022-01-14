import { Blockchain } from './blockchain';

const blockchain: Blockchain = new Blockchain();


/**
 * Testing
*/

const blocksToAdd: number = 3;

for(let i = 0; i < blocksToAdd; i++) {
    blockchain.addBlockToChain({name: 'Block ' + blockchain.currentIndex});
}

console.log(blockchain.chain);
console.log(blockchain.isValidChain());
