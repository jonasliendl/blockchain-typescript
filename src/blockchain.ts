import { Block } from "./block";

export class Blockchain {
    readonly chain: Array<Block>;
    difficulty: number = 4;

    /**
     * By creating a blockchain the chain and first block called `Genesis block` will be created.
     */
    constructor() {
        this.chain = [];
        this.generateGenesisBlock();
    }

    /**
     * Generating the first block of the blockchain called `Genesis block`.
     * @type private method
     */
    private generateGenesisBlock(): void {
        const genesisBlock: Block = new Block({name: 'Genesis block'}, 0, "");
        this.chain.push(genesisBlock);
    }

    /**
     * Add a block to the blockchain.
     * @param block
     */
    addBlockToChain(data: any, timestamp: Date = new Date()): void {
        const block: Block = new Block(
            data,
            this.currentIndex,
            this.blockBeforeByIndex(this.currentIndex).hash,
            timestamp
        );
        block.mine(this.difficulty);
        block.hash = block.calculateHash();
        if(this.isValidNextBlock(block)) {
            console.log(block)
            this.chain.push(block);
        } else {
            console.log('Error: Block is invalid');
        }
    }

    /**
     * Get the block before.
     * @type getter
     */
    get lastBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Get block before the block that was given.
     * @param block 
     * @returns Block
     */
    blockBefore(block: Block): Block {
        return this.chain[block.index - 1];
    }

    /**
     * Returns the block before the index that was given.
     * @param index 
     * @returns Block
     */
    blockBeforeByIndex(index: number): Block {
        return this.chain[index - 1];
    }

    /**
     * Get the current index of the blockchain.
     * @type getter
     */
    get currentIndex(): number {
        return this.chain.length;
    }

    /**
     * Validates the blockchain by checking every single block and the hashes in it.
     * @returns boolean
     */
    isValidChain(): boolean {
        const chain = this.chain;
        for(let i: number = 1; i < chain.length; i++) {
            const block: Block = chain[i];
            const blockBefore: Block = this.blockBefore(block);
            if(block.hashFromBlockBefore !== blockBefore.hash) {
                console.log(`Block ${block.index} has been manipulated`);
                return false;
            } else if(block.hash !== block.calculateHash()) {
                console.log(`Block ${block.index} has been manipulated`);
                return false;
            }
        }
        return true;
    }

    /**
     * Validate next block that should be added to the blockchain.
     * @param block 
     * @returns boolena
     */
    isValidNextBlock(block: Block): boolean {
        if(block.index !== this.lastBlock.index + 1) {
            return false;
        } else if(block.hashFromBlockBefore !== this.lastBlock.hash) {
            return false;
        } else {
            return true;
        }
    }
}
